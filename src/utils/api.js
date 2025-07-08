import axios from 'axios'
import emailjs from 'emailjs-com'

export const getRepos = async () => {
  try {
    const response = await axios.get('https://api.github.com/users/Aayush0007/repos')
    return response.data
  } catch (error) {
    console.error('Error fetching GitHub repos:', error)
    return []
  }
}
