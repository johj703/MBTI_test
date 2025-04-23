import axios from 'axios';

const API_URL = 'http://localhost:5000/testResults';

// 모든 테스트 결과를 가져오는 함수
export const getTestResults = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};
// 새로운 테스트 결과를 생성하는 함수
export const createTestResult = async (resultData) => {

};
// 테스트 결과를 삭제하는 함수수
export const deleteTestResult = async (id) => {

};
// 
export const updateTestResultVisibility = async(id, visibility) => {
    
}