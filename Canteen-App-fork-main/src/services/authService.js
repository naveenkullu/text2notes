import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { auth, isFirebaseConfigured } from '../config/firebase';

const ADMIN_EMAIL = process.env.EXPO_PUBLIC_ADMIN_EMAIL || 'admin@canteen.com';
const NORMALIZED_ADMIN_EMAIL = ADMIN_EMAIL.trim().toLowerCase();

const ensureFirebaseConfigured = () => {
  if (!isFirebaseConfigured) {
    throw new Error(
      'Firebase config missing. Add EXPO_PUBLIC_FIREBASE_* values in your environment.'
    );
  }
};

const createAuthError = (code, message) => {
  const error = new Error(message);
  error.code = code;
  return error;
};

const mapFirebaseUser = (firebaseUser) => {
  if (!firebaseUser) return null;

  const role =
    (firebaseUser.email || '').trim().toLowerCase() === NORMALIZED_ADMIN_EMAIL
      ? 'admin'
      : 'user';

  return {
    uid: firebaseUser.uid,
    role,
    email: firebaseUser.email || undefined,
    name: firebaseUser.displayName || (role === 'admin' ? 'Admin' : 'Customer'),
  };
};

export const loginUser = async ({ email, password }) => {
  ensureFirebaseConfigured();

  const normalizedEmail = (email || '').trim().toLowerCase();

  const result = await signInWithEmailAndPassword(auth, normalizedEmail, password);

  if ((result.user.email || '').trim().toLowerCase() === NORMALIZED_ADMIN_EMAIL) {
    await signOut(auth);
    throw new Error('This account is admin. Please login from Admin section.');
  }

  const token = await result.user.getIdToken();

  return {
    token,
    user: mapFirebaseUser(result.user),
  };
};

export const signupUser = async ({ name, email, password }) => {
  ensureFirebaseConfigured();

  const normalizedEmail = (email || '').trim().toLowerCase();
  const trimmedName = (name || '').trim();

  if (normalizedEmail === NORMALIZED_ADMIN_EMAIL) {
    throw new Error('This email is reserved for admin. Please use a different email.');
  }

  let result;

  try {
    result = await createUserWithEmailAndPassword(auth, normalizedEmail, password);
  } catch (error) {
    const code = error?.code || '';

    if (code.includes('email-already-in-use')) {
      try {
        const existingResult = await signInWithEmailAndPassword(auth, normalizedEmail, password);

        if (!existingResult.user.emailVerified) {
          try {
            await sendEmailVerification(existingResult.user);
          } catch (verificationError) {
            console.warn(
              'Failed to resend verification email for existing unverified account:',
              verificationError?.message || verificationError
            );
          }

          await signOut(auth);

          return {
            requiresEmailVerification: true,
            verificationAction: 'resent',
            email: normalizedEmail,
            user: mapFirebaseUser(existingResult.user),
          };
        }

        await signOut(auth);
        throw createAuthError(
          'auth/email-already-verified',
          'This email is already verified. Please login instead of signing up.'
        );
      } catch (signInError) {
        const signInCode = signInError?.code || '';

        if (signInCode.includes('invalid-credential') || signInCode.includes('wrong-password')) {
          throw createAuthError(
            'auth/unverified-account-password-required',
            'This email already has an account. To resend verification link, enter the same password used during signup.'
          );
        }

        throw error;
      }
    }

    throw error;
  }

  if (trimmedName) {
    await updateProfile(result.user, { displayName: trimmedName });
    await result.user.reload();
  }

  try {
    await sendEmailVerification(result.user);
  } catch (verificationError) {
    console.warn('Failed to send verification email:', verificationError?.message || verificationError);
  }

  await signOut(auth);

  return {
    requiresEmailVerification: true,
    verificationAction: 'sent',
    email: normalizedEmail,
    user: mapFirebaseUser(result.user),
  };
};

export const loginAdmin = async ({ email, password }) => {
  ensureFirebaseConfigured();

  const normalizedEmail = (email || '').trim().toLowerCase();

  const result = await signInWithEmailAndPassword(auth, normalizedEmail, password);

  if ((result.user.email || '').trim().toLowerCase() !== NORMALIZED_ADMIN_EMAIL) {
    await signOut(auth);
    throw new Error('Not authorized as admin account');
  }

  const token = await result.user.getIdToken();

  return {
    token,
    user: mapFirebaseUser(result.user),
  };
};

export const getCurrentAuthenticatedSession = async () => {
  ensureFirebaseConfigured();

  const currentUser = auth.currentUser;
  if (!currentUser) return null;

  const token = await currentUser.getIdToken();

  return {
    token,
    user: mapFirebaseUser(currentUser),
  };
};

export const logoutFromAuth = async () => {
  ensureFirebaseConfigured();
  await signOut(auth);
};

export const updateAuthUserProfile = async ({ name }) => {
  ensureFirebaseConfigured();

  if (!auth.currentUser || !name) return;

  await updateProfile(auth.currentUser, { displayName: name });
};

export const getAdminLoginInfo = () => ({
  email: ADMIN_EMAIL,
  passwordHint:
    'Use password set for this email in Firebase Authentication (Email/Password provider).',
});
