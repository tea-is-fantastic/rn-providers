import React from 'react';
import { Dimensions, ImageBackground, View } from 'react-native';
import { CustomStatusBar } from '../ui';
import Carousel from 'react-native-reanimated-carousel';
import type { ImageSource } from 'react-native-vector-icons/Icon';

const width = Dimensions.get('window').width;
const height = width / 1.3;

interface ICoverWithContent {
  image: ImageSource[];
  children: React.ReactNode[];
}

export const CoverWithContent: React.FC<ICoverWithContent> = ({ children, image }) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#fff',
      }}>
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
        }}>
        <Carousel
          data={image}
          loop={true}
          autoPlay={true}
          autoPlayInterval={2500}
          width={width}
          height={height}
          renderItem={({ item, index }) => (
            <ImageBackground
              key={index}
              imageStyle={{
                resizeMode: 'cover',
                alignItems: 'flex-end',
              }}
              source={item}
              style={{
                width,
                height,
              }}
            />
          )}

          // style={{
          //   // flex: 1,
          //   // width,
          //   // height,
          //   position: 'absolute',
          //   top: 0,
          //   left: 0,
          //   right: 0,
          // }}
        />
      </View>
      <View
        style={{
          position: 'absolute',
          top: height,
          paddingTop: 36,
          left: 0,
          right: 0,
        }}>
        {children[0]}
      </View>
      {children[1] && (
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: 15,
            alignItems: 'stretch',
            justifyContent: 'center',
          }}>
          {children[1]}
        </View>
      )}
      <CustomStatusBar backgroundColor='transparent' />
    </View>
  );
};
