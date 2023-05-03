import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Image } from 'react-native';
const dropDownArrow = require('../assets/drop-down-arrow.png')

const AccordionListItem = ({ title, content, titleStyle, inputContentHeight }) => {
  const [expanded, setExpanded] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;
  const rotateValue = useRef(new Animated.Value(0)).current;
  const contentRef = useRef(null);
 

  const toggleAccordion = () => {
    setExpanded(!expanded);
    Animated.parallel([
      Animated.timing(animation, {
        toValue: expanded ? 0 : 1,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(rotateValue, {
        toValue: expanded ? 0 : 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

 

  const contentHeight = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, inputContentHeight],
  });

  const contentOpacity = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const rotateInterpolate = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '-90deg'],
  });



  return (
    <View>
      <TouchableOpacity onPress={toggleAccordion}>
        <Animated.Image
          source={dropDownArrow}
          style={{
            top: 15,
            width: 30,
            height: 30,
            position: "absolute",
            marginLeft: 220,
            transform: [{ rotate: rotateInterpolate }],
          }}
        />
        <Text style={titleStyle}>{title}</Text>
      </TouchableOpacity>
      <Animated.View style={{ height: contentHeight, opacity: contentOpacity }}  >
        {content}
      </Animated.View>
    </View>
  );
};

export default AccordionListItem;