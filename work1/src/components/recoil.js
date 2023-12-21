import { atom } from 'recoil';

export const userState = atom({
  key: 'user',
  default: ''
});
export const modalState = atom({
  key: 'modalState',
  default:  false
  
});

export const boardDetailNoState  = atom({
  key:'boardNo',
  default:''
})  

export const boardEdtiState = atom({
  key:"editState",
  default:false
})

export const reLoadState = atom({
  key:"reLoad",
  default:''
})
