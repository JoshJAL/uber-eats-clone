import { View, Text, SafeAreaView, ScrollView, StatusBar } from "react-native";
import React, { useEffect, useState } from "react";
import HeaderTabs from "../components/home/HeaderTabs";
import SearchBar from "../components/home/SearchBar";
import Categories from "../components/home/Categories";
import RestaurantItems from "../components/home/RestaurantItems";
import BottomTabs from "../components/home/BottomTabs";
import { Divider } from "react-native-elements";
import SafeViewAndroid from "../components/SafeViewAndroid";

const YELP_API_KEY =
  "yX0k2vE8KYNztgN0j_YbKDhLjPP_QSop8L5ygiixxlOHZS2Y43fJSAxEGWGHDb2xCEJeQLrlYDVbcZI4jlriiUsKTrUWj-afj4g7k806TuoX8NM78jLgjzZC6HdJYnYx";

export default function Home({ navigation }) {
  const [city, setCity] = useState("Tampa");
  const [restaurantsData, setRestaurantsData] = useState([]);
  const [activeTab, setActiveTab] = useState("Delivery");

  const getRestaurantsFromYelp = () => {
    const yelpUrl = `https://api.yelp.com/v3/businesses/search?term=restaurants&location=${city}`;

    const apiOptions = {
      headers: {
        Authorization: `Bearer ${YELP_API_KEY}`,
      },
    };

    return fetch(yelpUrl, apiOptions)
      .then((res) => res.json())
      .then((json) =>
        setRestaurantsData(
          json.businesses.filter((business) =>
            business.transactions.includes(activeTab.toLowerCase())
          )
        )
      );
  };

  useEffect(() => {
    getRestaurantsFromYelp();
  }, [city, activeTab]);

  return (
    <SafeAreaView
      style={{
        backgroundColor: "#eee",
        flex: 1,
      }}
    >
      <View style={SafeViewAndroid.AndroidSafeArea}>
        <View style={{ backgroundColor: "white", padding: 15 }}>
          <HeaderTabs activeTab={activeTab} setActiveTab={setActiveTab} />
          <SearchBar cityHandler={setCity} />
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Categories />
          <RestaurantItems
            restaurantsData={restaurantsData}
            navigation={navigation}
          />
        </ScrollView>
        <Divider width={1} />
        <BottomTabs />
      </View>
    </SafeAreaView>
  );
}
