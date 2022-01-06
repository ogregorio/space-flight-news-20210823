import axios from 'axios';

const articlesService = async (
  route,
  options,
): Promise<{ data: any; status: number }> => {
  try {
    const { data, status } = await axios.get(
      process.env.SPACE_FLIGHTS_API_URL + route,
      options,
    );
    return { data, status };
  } catch (err) {
    return { data: err.data, status: err.status };
  }
};

export { articlesService };
