import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, RefreshControl } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getusersrequest } from '../Redux/Actions/Actions';
import ErrorBoundary from '../Components/ErrorBoundary';

const HomeScreen = (props) => {
    const dispatch = useDispatch();
    const { users, loading, error } = useSelector(store => store.userReducer);
    const [refreshing, setRefreshing] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        const fetchUsers =  () => {
            try {
                dispatch(getusersrequest(page)); 
                setHasMore(users.length > 0); 
            } catch (error) {
                console.log(error, 'show error');
            }
        };

        fetchUsers();
    }, [dispatch, page]);

    const handleProfileNavigation = (item) => {
        props.navigation.navigate('Profile', { profile: item });
    };

    const onRefresh = () => {
        setRefreshing(true);
        setPage(1); 
        dispatch(getusersrequest(1)); 
        setRefreshing(false);
    };

    const loadMore = () => {
        if (!loading && hasMore) {
            setPage((prev) => prev + 1); 
        }
    };

    return (
        <View style={[styles.container]}>
            {error && <ErrorBoundary />}
            {loading && page === 1 ? (
                <ActivityIndicator size='large' style={[styles.loader]} />
            ) : (
                <FlatList
                    data={users}
                    keyExtractor={(item) => item.email}
                    contentContainerStyle={{ gap: 10 }}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => handleProfileNavigation(item)} style={[styles.box]}>
                            <View>
                                <Image style={[styles.image]} source={{ uri: item.picture.large }} />
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View>
                                    <Text style={[styles.name]}>{`${item.name.first} ${item.name.last}`}</Text>
                                    <Text style={{ fontSize: 10, flex: 2 }}>{item.email}</Text>
                                    <Text style={{ fontSize: 10, flex: 2 }}>Country | {item.location.country}</Text>
                                </View>
                                <View>
                                    <Text style={{ fontSize: 10 }}>
                                        {new Date(item.registered.date).toLocaleDateString("en-GB", {
                                            day: "numeric",
                                            month: "long",
                                            year: "numeric",
                                        })}
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                    onEndReached={loadMore}
                    onEndReachedThreshold={0.5}
                    ListFooterComponent={loading && page > 1 ? <ActivityIndicator /> : null}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    loader: {
        top: '50%',
    },
    image: {
        width: 50,
        height: 50,
    },
    box: {
        flexDirection: 'row',
        gap: 20,
        alignItems: 'center',
        borderBottomWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    name: {
        fontSize: 18,
        fontWeight: '600',
    },
});

export default HomeScreen;
