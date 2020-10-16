import {axiosWithAuth} from './axiosWithAuth';

export const fetchColors = () => {
    axiosWithAuth()
.get('/api/colors')
.then(res=>{
  console.log(res)
  setColorList(res.data)
})
.catch(err=>{
  console.log(err)

})

}