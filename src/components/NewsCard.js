import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Linking } from 'react-native';

const NewsCard = ({ article }) => {
  const handlePress = () => {
    if (article.url) {
      Linking.openURL(article.url);
    }
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.container}>
        {article.urlToImage && (
          <Image source={{ uri: article.urlToImage }} style={styles.image} />
        )}
        <View style={styles.content}>
          <Text style={styles.title}>{article.title}</Text>
          <Text style={styles.description} numberOfLines={2}>
            {article.description}
          </Text>
          <Text style={styles.source}>{article.source?.name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 8,
    margin: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 150,
  },
  content: {
    padding: 15,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  source: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
  },
});

export default NewsCard;