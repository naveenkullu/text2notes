import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const OrderConfirmationScreen = ({ navigation, route }) => {
  const { order } = route.params;
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 60,
        friction: 6,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Success Circle */}
        <Animated.View
          style={[styles.circle, { transform: [{ scale: scaleAnim }] }]}
        >
          <Text style={styles.checkmark}>✓</Text>
        </Animated.View>

        <Animated.View style={{ opacity: fadeAnim, width: '100%' }}>
          <Text style={styles.title}>Order Placed! 🎉</Text>
          <Text style={styles.subtitle}>Your order has been placed successfully.</Text>

          {/* Order Card */}
          <View style={styles.card}>
            <View style={styles.row}>
              <Text style={styles.label}>Order ID</Text>
              <Text style={styles.orderId}>{order.orderId}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.row}>
              <Text style={styles.label}>Items</Text>
              <Text style={styles.value}>{order.items.length} item(s)</Text>
            </View>

            {/* Items list */}
            <View style={styles.itemsBox}>
              {order.items.map((item) => (
                <View key={item.id} style={styles.itemRow}>
                  <Text style={styles.itemName}>{item.name} x{item.quantity}</Text>
                  <Text style={styles.itemPrice}>₹{item.price * item.quantity}</Text>
                </View>
              ))}
            </View>

            <View style={styles.divider} />
            <View style={styles.row}>
              <Text style={styles.label}>Total Paid</Text>
              <Text style={styles.totalAmount}>₹{order.totalAmount}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.statusRow}>
              <View style={styles.statusDot} />
              <Text style={styles.statusText}>Status: {order.status}</Text>
            </View>
          </View>

          {/* Instruction */}
          <View style={styles.infoBox}>
            <Text style={styles.infoText}>
              📍 Show your Order ID{' '}
              <Text style={styles.infoOrderId}>{order.orderId}</Text>
              {' '}at the counter to collect your food.
            </Text>
          </View>
        </Animated.View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.menuBtn}
          onPress={() => navigation.popToTop()}
          activeOpacity={0.9}
        >
          <Text style={styles.menuBtnText}>🏠  Back to Menu</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scroll: {
    alignItems: 'center',
    paddingTop: 36,
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    elevation: 6,
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
  },
  checkmark: {
    fontSize: 48,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1A1A2E',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: '#888888',
    textAlign: 'center',
    marginBottom: 24,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 20,
    width: '100%',
    elevation: 3,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    marginBottom: 14,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 6,
  },
  label: {
    fontSize: 13,
    color: '#888888',
  },
  orderId: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#FF6B35',
  },
  value: {
    fontSize: 14,
    color: '#1A1A2E',
    fontWeight: 'bold',
  },
  itemsBox: {
    backgroundColor: '#F9F9F9',
    borderRadius: 10,
    padding: 10,
    marginVertical: 8,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  itemName: {
    fontSize: 13,
    color: '#666666',
    flex: 1,
  },
  itemPrice: {
    fontSize: 13,
    color: '#1A1A2E',
    fontWeight: 'bold',
  },
  divider: {
    height: 1,
    backgroundColor: '#EEEEEE',
    marginVertical: 8,
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A1A2E',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#4CAF50',
    marginRight: 8,
  },
  statusText: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  infoBox: {
    backgroundColor: '#FFF8E1',
    borderRadius: 14,
    padding: 14,
    width: '100%',
  },
  infoText: {
    fontSize: 13,
    color: '#795548',
    lineHeight: 20,
  },
  infoOrderId: {
    fontWeight: 'bold',
    color: '#FF6B35',
  },
  footer: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
  },
  menuBtn: {
    backgroundColor: '#FF6B35',
    borderRadius: 16,
    paddingVertical: 17,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#FF6B35',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  menuBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default OrderConfirmationScreen;
