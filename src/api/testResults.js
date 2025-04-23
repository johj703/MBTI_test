import axios from 'axios';

const API_URL = 'http://localhost:5000/testResults';

// 모든 테스트 결과를 가져오는 함수
export const getTestResults = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};
// 새로운 테스트 결과를 생성하는 함수
export const createTestResult = async (resultData) => {
try{
    const response = await axios.post(API_URL, {
        ...resultData,
        createdAt: new Date().toISOString(),
        inVisible: true // 기본적으로 결과는 보이도록 설정정
    });
    return response.data;
} catch(error) {
    console.error('테스트 결과 생성 오류: ', error);
    throw error;
}
};
// 테스트 결과를 삭제하는 함수
export const deleteTestResult = async (id) => {
try{
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
} catch(error) {
    console.error('테스트 결과 삭제 오류', error);
    throw error;
}
};
// 테스트 결과를 보여줄지 아니면 숨길지 하는 함수
export const updateTestResultVisibility = async(id, visibility) => {
try{
    // patch 요청으로 테스트 결과를 보여주는 상태만 업데이트
    const response = await axios.patch(`${API_URL}/${id}`, {
        isVisible: visibility
    });
    return response.data;
} catch(error) {
    console.error('테스트 결과 가시성 업데이트 오류:', error);
    throw error;
}
}