import {format} from 'date-fns';
import React, {FC} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

type Props = {
  title: string;
  publishedAt: Date;
  imageUrl: string;
  onSelect: () => void;
};

const NewsItem: FC<Props> = ({title, publishedAt, imageUrl, onSelect}) => {
  console.log(publishedAt);

  const removeExceptTitle = (title: string) => {
    let index = title.indexOf('/');
    if (index !== -1) {
      return title.slice(0, index);
    }
    index = title.indexOf('-');
    if (index !== -1) {
      {
        return title.slice(0, index);
      }
    }
    return title;
  };

  return (
    <TouchableOpacity onPress={onSelect}>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{removeExceptTitle(title)}</Text>
          {publishedAt && (
            <Text style={styles.date}>
              {format(publishedAt, 'yyyy.MM.dd HH:mm')}
            </Text>
          )}
        </View>
        {imageUrl && (
          <Image
            source={{uri: imageUrl}}
            style={styles.image}
            resizeMode="cover"
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexDirection: 'row',
    paddingVertical: 12,
    gap: 12,
    borderBottomColor: '#C9C9C9',
    borderBottomWidth: 0.7,
    marginHorizontal: 12,
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: 'Pretendard',
    fontSize: 20,
    fontWeight: '700',
    color: 'black',
  },
  date: {
    fontFamily: 'Pretendard',
    fontSize: 14,
    fontWeight: '300',
    color: '#C9C9C9',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 12,
  },
});

export default NewsItem;
