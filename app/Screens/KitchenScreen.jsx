import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Sample data for kitchen orders
const ordersData = [
  { orderId: 'Order 1', tableId: 'Table 1', status: 'In Preparation' },
  { orderId: 'Order 2', tableId: 'Table 2', status: 'In Preparation' },
  { orderId: 'Order 3', tableId: 'Table 3', status: 'Ready to Serve' },
];

// Sample notifications
const notificationsData = [
  { id: 'notif_1', message: 'Order for Table 1 is ready to serve' },
  { id: 'notif_2', message: 'Order for Table 2 needs attention' },
];

const KitchenScreen = () => {
  const [orders, setOrders] = useState(ordersData);
  const [notifications, setNotifications] = useState(notificationsData);

  // Function to mark order as ready
  const handleOrderReady = (orderId) => {
    setOrders(orders.map(order =>
      order.orderId === orderId ? { ...order, status: 'Ready to Serve' } : order
    ));
  };

  // Function to accept an order
  const handleAcceptOrder = (orderId) => {
    setOrders(orders.map(order =>
      order.orderId === orderId ? { ...order, status: 'In Preparation' } : order
    ));
  };

  // Function to decline an order
  const handleDeclineOrder = (orderId) => {
    setOrders(orders.filter(order => order.orderId !== orderId)); // Remove the declined order
  };

  // Call waiter action (Notification or alert)
  const handleCallWaiter = (tableId) => {
    alert(`Waiter has been called for ${tableId}`);
  };

  // Profile button action
  const handleProfilePress = () => {
    alert('Profile button pressed!');
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Kitchen Dashboard</Text>
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

            {/* Order Actions */}
            {item.status === 'In Preparation' && (
              <>
                <TouchableOpacity style={styles.button} onPress={() => handleOrderReady(item.orderId)}>
                  <Icon name="check-circle" size={20} color="#4caf50" />
                  <Text style={styles.buttonText}>Mark as Ready</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => handleDeclineOrder(item.orderId)}>
                  <Icon name="cancel" size={20} color="#f44336" />
                  <Text style={styles.buttonText}>Decline Order</Text>
                </TouchableOpacity>
              </>
            )}

            {/* Accept or Decline buttons */}
            {item.status === 'Ready to Serve' && (
              <>
                <TouchableOpacity style={styles.button} onPress={() => handleAcceptOrder(item.orderId)}>
                  <Icon name="check-circle" size={20} color="#4caf50" />
                  <Text style={styles.buttonText}>Accept Order</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => handleDeclineOrder(item.orderId)}>
                  <Icon name="cancel" size={20} color="#f44336" />
                  <Text style={styles.buttonText}>Decline Order</Text>
                </TouchableOpacity>
              </>
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

      {/* Call Waiter Button */}
      <TouchableOpacity style={styles.callWaiterButton} onPress={() => handleCallWaiter('Table 1')}>
        <Icon name="call" size={20} color="#ffffff" />
        <Text style={styles.callWaiterText}>Call Waiter</Text>
      </TouchableOpacity>
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
  callWaiterButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#00796b', padding: 15, marginTop: 20, borderRadius: 5 },
  callWaiterText: { color: '#ffffff', marginLeft: 10, fontSize: 16 },
});

export default KitchenScreen;
