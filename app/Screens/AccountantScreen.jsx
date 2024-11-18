import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Sample orders data for accountant
const ordersData = [
  { orderId: 'Order 1', tableId: 'Table 1', status: 'Ready to Pay', amount: 20.5 },
  { orderId: 'Order 2', tableId: 'Table 2', status: 'Paid', amount: 15.0 },
  { orderId: 'Order 3', tableId: 'Table 3', status: 'Ready to Pay', amount: 30.0 },
];

// Sample notifications for accountant
const notificationsData = [
  { id: 'notif_1', message: 'Payment confirmation for Order 1 is pending.' },
  { id: 'notif_2', message: 'Order 3 has been paid.' },
];

const AccountantScreen = () => {
  const [orders, setOrders] = useState(ordersData);
  const [notifications, setNotifications] = useState(notificationsData);

  // Function to confirm payment
  const handlePaymentConfirmed = (orderId) => {
    setOrders(orders.map(order =>
      order.orderId === orderId ? { ...order, status: 'Paid' } : order
    ));
  };

  // Profile button press
  const handleProfilePress = () => {
    alert('Profile button pressed!');
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Accountant Dashboard</Text>
        <TouchableOpacity style={styles.profileButton} onPress={handleProfilePress}>
          <Icon name="account-circle" size={30} color="#00796b" />
        </TouchableOpacity>
      </View>

      {/* Orders Section */}
      <Text style={styles.sectionTitle}>Orders</Text>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.orderId}
        renderItem={({ item }) => (
          <View style={styles.orderCard}>
            <View style={styles.cardHeader}>
              <Icon name="restaurant" size={24} color="#00796b" />
              <Text style={styles.tableText}>{item.tableId} - {item.status}</Text>
            </View>

            {/* Payment Actions */}
            {item.status === 'Ready to Pay' && (
              <TouchableOpacity style={styles.button} onPress={() => handlePaymentConfirmed(item.orderId)}>
                <Icon name="check-circle" size={20} color="#4caf50" />
                <Text style={styles.buttonText}>Confirm Payment</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      />

      {/* Notifications Section */}
      <Text style={styles.sectionTitle}>Notifications</Text>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.notificationCard}>
            <Icon name="notifications" size={24} color="#f44336" />
            <Text>{item.message}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  headerContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  profileButton: { padding: 10 },
  sectionTitle: { fontSize: 20, marginTop: 15, marginBottom: 5 },
  orderCard: { padding: 10, backgroundColor: '#e0f7fa', marginBottom: 5, borderRadius: 5 },
  notificationCard: { flexDirection: 'row', alignItems: 'center', padding: 10, backgroundColor: '#ffecb3', marginBottom: 5, borderRadius: 5 },
  cardHeader: { flexDirection: 'row', alignItems: 'center' },
  tableText: { fontSize: 16, marginLeft: 10 },
  button: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
  buttonText: { marginLeft: 10, fontSize: 16 },
});

export default AccountantScreen;
