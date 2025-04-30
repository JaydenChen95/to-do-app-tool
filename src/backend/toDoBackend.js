import axios from "axios";
import { API_URL } from '../../constants/apiUrl';

export async function createNewTask(data){
    try {
        const response = await axios.post(`${API_URL}/to-do`, data);
        return response.data;
    } catch (e){
        console.error(e);
    }
}

export async function getAllTasks(){
    try {
        const response = await axios.get(`${API_URL}/to-do`);
        console.log(response)
        return response.data;
    } catch (e){
        console.error(e);
    }
}

export async function editTask(editedTask){
    const { id } = editedTask;
    console.log(editedTask)
    try {
        await axios.put(`${API_URL}/to-do/${id}`, editedTask);
    } catch (e){
        console.error(e);
    }
}