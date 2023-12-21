import axios from "axios"
//게시글 삭제
export const deleteBoard = (boardNo) => {
  const apiUrl = `http://localhost:8080/board/delete/${boardNo}`;

  axios.delete(apiUrl)
    .then(response => {
      // 삭제 성공 시 수행할 로직
      console.log('Board deleted successfully:', response.data);
    })
    .catch(error => {
      // 삭제 실패 시 수행할 로직
      console.error('Error deleting board:', error);
    });
};
//회원 검색
export const searchMember = async (memberDto) => {
  try {
    const apiUrl = `http://localhost:8080/member/searchMember`;
    const requestData = memberDto;

    const response = await axios.post(apiUrl, requestData);
    return response.data;
  } catch (error) {
    console.error('Error during searchMember:', error);
    throw error; // 에러를 다시 throw하여 상위 호출자에게 전파
  }
};

const naviToMypage = () => {
};
//팔추
export const addFollow = (follow , user) => {
  console.log(follow,user)
  const apiUrl = `http://localhost:8080/follow/add`
  const requestData = {
    myId : user,
    followId:follow
  };
  axios.post(apiUrl, requestData)

    .then(res => {
      if (res.request.status === 200) {
       // alert("등록되었습니다.")
      }

    })
    .catch(err => {
      if (err.request.status === 404) {
        console.log(err, "not found")
      }
      else if(err.request.status===400){
         alert("이미 등록된 아이디입니다") }
    });

};
//내가 팔로우 한사람들
export const getFollowingList =async (user)=>{
  console.log(user)

  const apiUrl =`http://localhost:8080/follow/followingList/${user}`

  const res= await axios.get(apiUrl);
  console.log(res.data);
  return res.data;
}

//나를 팔로우 한사람들

export const getFollowerList = async (user)=>{
  const apiUrl = `http://localhost:8080/follow/followerList/${user}`

  const res = await axios.get(apiUrl);
  return res.data

}; 

export const deleteFollow =(follow , user)=>{
  const apiUrl = `http://localhost:8080/follow/deleteFollow`

  const requestData = {
    myId:user,
    followId:follow
  }

  console.log("request",requestData)

  axios.post(apiUrl, requestData).then(res=>{
    if(res.request.status ===200){
      //alert("삭제되었습니다")
    }
    else{
      alert("오류")
    };
  })


};