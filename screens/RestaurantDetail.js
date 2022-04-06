import { View, Text } from "react-native";
import React from "react";
import { Divider } from "react-native-elements";
import About from "../components/restaurantDetail/About";
import MenuItems from "../components/restaurantDetail/MenuItems";
import ViewCart from "../components/restaurantDetail/ViewCart";

const foods = [
  {
    title: "Lasagna",
    description: "With butter lettuce, tomato and sauce bechamel",
    price: "$13.50",
    image:
      "https://www.thewholesomedish.com/wp-content/uploads/2018/07/Best-Lasagna-550-500x375.jpg",
  },
  {
    title: "Tandoori Chicken",
    description:
      "Amazing Indian dish with tenderloin chicken off the sizzles 🔥",
    price: "$19.20",
    image:
      "https://www.jocooks.com/wp-content/uploads/2012/03/tandoori-chicken-1-11-500x375.jpg",
  },
  {
    title: "Chilaquiles",
    description:
      "Chilaquiles with cheese and sauce. A delicious Mexican dish 🇲🇽",
    price: "$19.20",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/3/3d/Portada-chilaquiles-rojos.jpg",
  },
  {
    title: "Chicken Caesar Salad",
    description:
      "You can never go wrong with a chicken Caesar salad. Healthy option with greens and proteins!",
    price: "$21.50",
    image:
      "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2010/3/3/0/FNM_040110-W-N-Dinners-015_s4x3.jpg.rend.hgtvcom.616.462.suffix/1371591380107.jpeg",
  },
];


export default function RestaurantDetail({ route, navigation }) {
  return (
    <View>
      <About route={route} />
      <Divider width={1.8} style={{ marginVertical: 20 }} />
      <MenuItems foods={foods} RestaurantName={route.params.name} />
      <ViewCart navigation={navigation} RestaurantName={route.params.name} />
    </View>
  );
}
