import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const tablesData = [
    { tableId: 'Table 1', status: 'Occupied', request: 'Call Waiter' },
    { tableId: 'Table 2', status: 'Vacant', request: '' },
    { tableId: 'Table 3', status: 'Occupied', request: 'Order in Progress' },
];

const ordersData = [
    { orderId: 'Order 1', tableId: 'Table 1', status: 'Ready to Serve' },
    { orderId: 'Order 2', tableId: 'Table 3', status: 'In Preparation' },
];

const WaiterUI = () => {
    const [tables, setTables] = useState(tablesData);
    const [orders, setOrders] = useState(ordersData);
    const [notifications, setNotifications] = useState([
        { id: 'notif_1', message: 'Table 1 needs assistance' },
        { id: 'notif_2', message: 'Order for Table 3 is ready to serve' },
    ]);

    // Function to mark order as served
    const handleOrderServed = (orderId) => {
        setOrders(orders.map(order =>
            order.orderId === orderId ? { ...order, status: 'Served' } : order
        ));
    };

    // Profile button press
    const handleProfilePress = () => {
        alert('Profile button pressed!');
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.header}>Waiter Dashboard</Text>
                <TouchableOpacity style={styles.profileButton} onPress={handleProfilePress}>
                    <Icon name="account-circle" size={30} color="#00796b" />
                </TouchableOpacity>
            </View>

            {/* Table Status Section */}
            <Text style={styles.sectionTitle}>Table Status</Text>
            <FlatList
                data={tables}
                keyExtractor={(item) => item.tableId}
                renderItem={({ item }) => (
                    <View style={styles.tableCard}>
                        <View style={styles.cardHeader}>
                            <Icon name="restaurant" size={24} color="#00796b" />
                            <Text style={styles.tableText}>{item.tableId}</Text>
                        </View>
                        <Text style={styles.tableStatus}>{item.status}</Text>
                        {item.request && <Text style={styles.requestText}>Request: {item.request}</Text>}
                    </View>
                )}
            />

            {/* Orders Section */}
            <Text style={styles.sectionTitle}>Order Status</Text>
            <FlatList
                data={orders}
                keyExtractor={(item) => item.orderId}
                renderItem={({ item }) => (
                    <View style={styles.orderCard}>
                        <View style={styles.cardHeader}>
                            <Icon name="receipt" size={24} color="#e65100" />
                            <Text>{item.tableId} - {item.status}</Text>
                        </View>
                        {item.status === 'Ready to Serve' && (
                            <TouchableOpacity style={styles.button} onPress={() => handleOrderServed(item.orderId)}>
                                <Icon name="check-circle" size={20} color="#4caf50" />
                                <Text style={styles.buttonText}>Mark as Served</Text>
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
    tableCard: { padding: 10, backgroundColor: '#e0f7fa', marginBottom: 5, borderRadius: 5 },
    orderCard: { padding: 10, backgroundColor: '#ffe0b2', marginBottom: 5, borderRadius: 5 },
    notificationCard: { flexDirection: 'row', alignItems: 'center', padding: 10, backgroundColor: '#ffecb3', marginBottom: 5, borderRadius: 5 },
    cardHeader: { flexDirection: 'row', alignItems: 'center' },
    tableText: { fontSize: 16, marginLeft: 10 },
    tableStatus: { fontSize: 14, color: '#00796b' },
    requestText: { fontSize: 14, color: '#00796b' },
    button: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
    buttonText: { marginLeft: 10, fontSize: 16, color: '#4caf50' },
});

export default WaiterUI;
