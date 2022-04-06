import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { SafeAreaView } from "react-native";
import SafeViewAndroid from "../components/SafeViewAndroid";
import AnimatedLottieView from "lottie-react-native";
import firebase from "../firebase";
import MenuItems from "../components/restaurantDetail/MenuItems";

export default function OrderCompleted() {
  const [lastOrder, setLastOrder] = useState({
    items: [
      {
        title: "bologna",
        description: "this is the best bologna",
        price: "$10",
        image:
          "https://www.thewholesomedish.com/wp-content/uploads/2018/07/Best-Lasagna-550-500x375.jpg",
      },
    ],
  });

  const { items, restaurantName } = useSelector(
    (state) => state.cartReducer.selectedItems
  );
  const total = items
    .map((item) => Number(item.price.replace("$", "")))
    .reduce((prev, curr) => prev + curr, 0);

  const totalUSD = total.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

  useEffect(() => {
    const db = firebase.firestore();
    const unsubscribe = db
      .collection("orders")
      .orderBy("createdAt", "desc")
      .limit(1)
      .onSnapshot((snapshot) => {
        snapshot.docs.map((doc) => {
          setLastOrder(doc.data());
        });
      });

    return () => unsubscribe();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      {/* green check mark */}
      <View style={SafeViewAndroid.AndroidSafeArea}>
        <View style={{ margin: 15, alignItems: "center", height: "90%" }}>
          <AnimatedLottieView
            style={{
              height: 100,
              justifyContent: "center",
              alignSelf: "center",
              marginBottom: 30,
            }}
            source={require("../assets/animations/check-mark.json")}
            autoPlay
            speed={0.5}
            loop={false}
          />
          <Text style={{ color: "black", fontSize: 20, fontWeight: "bold" }}>
            Your order at {restaurantName} has been placed for {totalUSD}
          </Text>
          <ScrollView>
            <MenuItems
              foods={lastOrder.items}
              hideCheckbox={true}
              marginLeft={10}
            />
            <AnimatedLottieView
              style={{ height: 200, alignSelf: "center" }}
              source={require("../assets/animations/cooking.json")}
              autoPlay
              speed={0.5}
            />
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}
