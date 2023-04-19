export const getRefKey = async () => {
  try {
    const response = await fetch("https://test-for-me.prismic.io/api/v2"); // Replace with your API endpoint
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    // Handle the data
    // console.log(data);
    return data;
  } catch (error) {
    // Handle any errors that occurred during the fetch request
    console.error(error);
    throw error;
  }
};
