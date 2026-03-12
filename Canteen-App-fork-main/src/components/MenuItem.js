import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useCart } from '../context/CartContext';

const MenuItem = ({ item }) => {
  const { addToCart, increaseQuantity, decreaseQuantity, items } = useCart();
  const [imgError, setImgError] = useState(false);

  const cartItem = items.find((i) => i.id === item.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  return (
    <View style={styles.card}>
      {/* Image */}
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

      {/* Category pill */}
      <View style={styles.categoryBadge}>
        <Text style={styles.categoryText}>{item.category}</Text>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <View style={styles.nameRow}>
          <Text style={styles.name} numberOfLines={1}>
            {item.name}
          </Text>
          <Text style={styles.rating}>★ {item.rating}</Text>
        </View>

        <Text style={styles.description} numberOfLines={2}>
          {item.description}
        </Text>

        <View style={styles.footer}>
          <Text style={styles.price}>₹{item.price}</Text>

          {quantity === 0 ? (
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => addToCart(item)}
              activeOpacity={0.8}
            >
              <Text style={styles.addButtonText}>+ Add</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.qtyRow}>
              <TouchableOpacity
                style={styles.qtyBtn}
                onPress={() => decreaseQuantity(item.id)}
                activeOpacity={0.8}
              >
                <Text style={styles.qtyBtnText}>−</Text>
              </TouchableOpacity>
              <Text style={styles.qtyNum}>{quantity}</Text>
              <TouchableOpacity
                style={[styles.qtyBtn, styles.qtyBtnPlus]}
                onPress={() => increaseQuantity(item.id)}
                activeOpacity={0.8}
              >
                <Text style={styles.qtyBtnPlusText}>+</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    elevation: 3,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 160,
    backgroundColor: '#F0F0F0',
  },
  imageFallback: {
    width: '100%',
    height: 160,
    backgroundColor: '#FFF3E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fallbackEmoji: {
    fontSize: 60,
  },
  categoryBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: '#FF6B35',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  content: {
    padding: 14,
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A1A2E',
    flex: 1,
    marginRight: 8,
  },
  rating: {
    fontSize: 13,
    color: '#F57C00',
    fontWeight: 'bold',
  },
  description: {
    fontSize: 13,
    color: '#777777',
    lineHeight: 18,
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF6B35',
  },
  addButton: {
    backgroundColor: '#FF6B35',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  qtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FF6B35',
    borderRadius: 20,
    overflow: 'hidden',
  },
  qtyBtn: {
    width: 34,
    height: 34,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF3EE',
  },
  qtyBtnPlus: {
    backgroundColor: '#FF6B35',
  },
  qtyBtnText: {
    fontSize: 18,
    color: '#FF6B35',
    fontWeight: 'bold',
  },
  qtyBtnPlusText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  qtyNum: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1A1A2E',
    minWidth: 30,
    textAlign: 'center',
  },
});

export default MenuItem;
