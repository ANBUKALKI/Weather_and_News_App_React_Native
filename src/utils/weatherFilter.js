export const filterNewsByWeather = (articles, weather) => {
  if (!weather || !articles) return articles;
  
  const temp = weather.main.temp;
  let filteredArticles = [];
  
  if (temp < 10) { // Cold - show depressing news
    filteredArticles = articles.filter(article => 
      article.title.toLowerCase().includes('death') ||
      article.title.toLowerCase().includes('sad') ||
      article.title.toLowerCase().includes('depression') ||
      article.title.toLowerCase().includes('war') ||
      article.title.toLowerCase().includes('crisis')
    );
  } else if (temp > 25) { // Hot - show fear-related news
    filteredArticles = articles.filter(article => 
      article.title.toLowerCase().includes('fear') ||
      article.title.toLowerCase().includes('scary') ||
      article.title.toLowerCase().includes('danger') ||
      article.title.toLowerCase().includes('terror') ||
      article.title.toLowerCase().includes('warning')
    );
  } else { // Cool - show happy/winning news
    filteredArticles = articles.filter(article => 
      article.title.toLowerCase().includes('win') ||
      article.title.toLowerCase().includes('happy') ||
      article.title.toLowerCase().includes('success') ||
      article.title.toLowerCase().includes('joy') ||
      article.title.toLowerCase().includes('celebration')
    );
  }
  
  return filteredArticles.length > 0 ? filteredArticles : articles.slice(0, 5);
};