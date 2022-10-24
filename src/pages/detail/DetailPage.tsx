import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "../../redux/hooks";
import { getProductDetail } from "../../redux/productDetail/slice";
import { MainLayout } from "../../layouts/mainLayout";

export const DetailPage: React.FC = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate(); // 跳转

  const [flag, setFlag] = useState(true)
  const loading = useSelector((state) => state.productDetail.loading);
  const error = useSelector((state) => state.productDetail.error);
  const product = useSelector((state) => state.productDetail.data);


  useEffect(() => {
    dispatch(getProductDetail('1'))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (loading) {
    return <MainLayout>
      <div>
        加载中
      </div>
    </MainLayout>
  }
  if (error) {
    return <MainLayout>
      <div>
        网站出错：{error}     
        <button onClick={() => {
          navigate('/')
        }}>返回首页</button>
      </div>;
    </MainLayout>
  }
  return (
    <MainLayout>
      <div>
        <p>商品：{product.name}——售价{product.price}</p>
        {
          flag ? <button onClick={() => {
            dispatch(getProductDetail('1'))
            setFlag(false)
          }}>请求1</button> 
          :
          <button onClick={() => {
            dispatch(getProductDetail('2'))
            setFlag(true)
          }}>请求2</button>  
        }
        <button onClick={() => {
            navigate('/')
          }}>返回首页</button>
          
      </div>
    </MainLayout>
  )
}