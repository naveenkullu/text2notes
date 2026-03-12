import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useCart } from '../context/CartContext';

const CartItem = ({ item }) => {
  const { increaseQuantity, decreaseQuantity, removeFromCart } = useCart();
  const [imgError, setImgError] = useState(false);

  return (
    <View style={styles.container}>
      {!imgError ? (
        <Image
          source={{ uri: item.image }}
          style={styles.image}
          onError={() => setImgError(true)}
        />
      ) : (
        <View style={styles.imageFallback}>
          <Text style={styles.fallbackEmoji}>{item.emoji || '🍽️'}</Text>
        </View>
      )}

      <View style={styles.details}>
        <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.unitPrice}>₹{item.price} each</Text>
        <View style={styles.qtyRow}>
          <TouchableOpacity
            style={styles.qtyBtn}
            onPress={() => decreaseQuantity(item.id)}
          >
            <Text style={styles.qtyBtnText}>−</Text>
          </TouchableOpacity>
          <Text style={styles.qty}>{item.quantity}</Text>
          <TouchableOpacity
            style={[styles.qtyBtn, styles.qtyBtnPlus]}
            onPress={() => increaseQuantity(item.id)}
          >
            <Text style={styles.qtyBtnPlusText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.right}>
        <Text style={styles.total}>₹{item.price * item.quantity}</Text>
        <TouchableOpacity
          style={styles.removeBtn}
          onPress={() => removeFromCart(item.id)}
        >
          <Text style={styles.removeText}>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    marginHorizontal: 16,
    marginVertical: 6,
    padding: 12,
    elevation: 2,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    alignItems: 'center',
  },
  image: {
    width: 72,
    height: 72,
    borderRadius: 10,
    backgroundColor: '#F0F0F0',
  },
  imageFallback: {
    width: 72,
    height: 72,
    borderRadius: 10,
    backgroundColor: '#FFF3E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fallbackEmoji: {
    fontSize: 32,
  },
  details: {
    flex: 1,
    marginLeft: 12,
  },
  name: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1A1A2E',
    marginBottom: 2,
  },
  unitPrice: {
    fontSize: 12,
    color: '#999999',
    marginBottom: 8,
  },
  qtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  qtyBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  qtyBtnPlus: {
    backgroundColor: '#FF6B35',
  },
  qtyBtnText: {
    fontSize: 16,
    color: '#FF6B35',
    fontWeight: 'bold',
  },
  qtyBtnPlusText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  qty: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1A1A2E',
    marginHorizontal: 12,
    minWidth: 18,
    textAlign: 'center',
  },
  right: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    paddingLeft: 8,
  },
  total: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#FF6B35',
  },
  removeBtn: {
    backgroundColor: '#FFF0F0',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  removeText: {
    fontSize: 11,
    color: '#E53935',
    fontWeight: 'bold',
  },
});

export default CartItem;
