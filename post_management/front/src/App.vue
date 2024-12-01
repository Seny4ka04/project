<template>
  <div class="post-management">
    <h1>Post Management</h1>

    <div class="post-form">
      <h2>Create/Edit Post</h2>
      <form @submit.prevent="savePost">
        <label for="title">Title:</label>
        <input type="text" v-model="newPost.title" required>

        <label for="description">Description:</label>
        <textarea v-model="newPost.description" required></textarea>

        <label for="author">Author:</label>
        <input type="text" v-model="newPost.author" required>

        <button type="submit">Save Post</button>
      </form>
    </div>

    <div class="all-posts">
      <h2>All Posts</h2>
      <ul>
        <li v-for="(post, index) in posts" :key="index" class="post-item">
          <strong>{{ post.title }}</strong> - {{ post.description }} - {{ post.author }}
          <button @click="editPost(index)">Edit</button>
          <button @click="removePost(index)">Remove</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const posts = ref([]);
const newPost = ref({ title: '', description: '', author: '' });
let editingIndex = ref(null);

const fetchPosts = async () => {
  try {
    const response = await axios.get('http://localhost:8080/posts');
    posts.value = response.data;
  } catch (error) {
    console.error(error);
  }
};

const savePost = async () => {
  try {
    if (editingIndex.value !== null) {
      const response = await axios.put(`http://localhost:8080/posts/${posts.value[editingIndex.value].id}`, newPost.value);
      posts.value[editingIndex.value] = response.data;
      editingIndex.value = null;
    } else {
      const response = await axios.post('http://localhost:8080/posts', newPost.value);
      posts.value.push(response.data);
    }

    newPost.value = { title: '', description: '', author: '' };
  } catch (error) {
    console.error(error);
  }
};

const editPost = (index) => {
  newPost.value = { ...posts.value[index] };
  editingIndex.value = index;
};

const removePost = async (index) => {
  try {
    const response = await axios.delete(`http://localhost:8080/posts/${posts.value[index].id}`);
    if (response.status === 200) {
      posts.value.splice(index, 1);
    } else {
      console.error('Failed to delete post');
    }
  } catch (error) {
    console.error(error);
  }
};

onMounted(fetchPosts);
</script>

<style>
body {
  background: #000000;
  font-family: 'Arial', sans-serif;
  color: #00ffcc;
  text-shadow: 0 0 5px #00ffcc, 0 0 10px #00ffcc;
}

h1 {
  text-align: center;
  font-size: 3rem;
  margin-bottom: 20px;
}

.post-management {
  max-width: 800px;
  margin: auto;
  padding: 20px;
  border: 2px solid #00ffcc;
  border-radius: 10px;
  box-shadow: 0 0 20px #00ffcc;
}

.post-form, .all-posts {
  margin-bottom: 20px;
  padding: 20px;
  background: rgba(0, 0, 0, 0.7);
  border: 1px solid #00ffcc;
  border-radius: 10px;
  box-shadow: 0 0 15px #00ffcc;
}

label {
  font-size: 1.2rem;
  margin-bottom: 10px;
  display: block;
}

input, textarea {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  background: black;
  color: #00ffcc;
  border: 1px solid #00ffcc;
  border-radius: 5px;
  box-shadow: 0 0 10px #00ffcc inset;
}

button {
  background: black;
  color: #00ffcc;
  padding: 10px 15px;
  border: 1px solid #00ffcc;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s;
  text-shadow: 0 0 5px #00ffcc;
}

button:hover {
  background: #00ffcc;
  color: black;
  box-shadow: 0 0 15px #00ffcc;
}

.post-item {
  padding: 10px;
  margin-bottom: 10px;
  background: rgba(0, 0, 0, 0.9);
  border: 1px solid #00ffcc;
  border-radius: 5px;
  box-shadow: 0 0 10px #00ffcc;
  color: white;
}

.post-item button {
  margin-left: 10px;
}
</style>
