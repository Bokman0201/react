import axios from "axios";
import React, { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
import { boardDetailNoState } from "../recoil";
import { useRecoilState } from "recoil";

const BoardImageDetail = (props) => {
    

    const [imageList, setImageList] = useState({});
    const [imageSrc, setImageSrc] = useState([]);
    const [attachList, setAttachList] = useState([]);
    const [boardNo, setBoardNo] = useRecoilState(boardDetailNoState);


    const getAttach = async () => {
        try {
            const res = await axios.get(`http://localhost:8080/board/image/${boardNo}`)
            setAttachList(res.data)
        }
        catch { }
    }

    const getImages = async () => {
        console.log("start");

        try {
            const res = await fetch(`http://localhost:8080/image/board/${boardNo}`);
            console.log("실행");

            const images = await res.json();
            console.log(images)
            setImageList(images);

            // 이미지를 받아온 이후에 처리
            const decodedImages = Object.keys(images).map(key => {
                const base64Image = images[key];
                console.log("try")
                const binaryString = atob(base64Image);
                const bytes = new Uint8Array(binaryString.length);

                for (let i = 0; i < binaryString.length; i++) {
                    bytes[i] = binaryString.charCodeAt(i);
                }

                const blob = new Blob([bytes], { type: 'image/png' });
                return {
                    attachNo: key,
                    image: URL.createObjectURL(blob),
                };
            });

            // 디코딩된 이미지 배열을 상태에 추가
            setImageSrc(decodedImages);

        } catch (error) {
            console.log("튕김");
            console.error('Error fetching images:', error);
        }
    };


    useEffect(() => {
        getAttach();
        getImages();
    }, []);




    return (<>


        <Carousel>
            {attachList.map((attach, index) => (
                <Carousel.Item key={index}>
                    <div >
                        {imageSrc.filter((img) => img.attachNo == attach.attachNo)
                            .map((image, index) => (
                                <React.Fragment key={index}>
                                    {attach.attachType.split("/")[0] === "image" ? (
                                        <img
                                            style={{
                                                objectFit: 'cover',
                                                width: '100%',
                                                height: '100%',
                                                margin: 'auto',
                                                display: 'block',
                                            }}
                                            src={image.image}
                                            alt={`게시물 이미지 ${index + 1}`}
                                            className="image-style"
                                        />
                                    ) : (
                                        <video
                                            id="myVideo"
                                            controls
                                            width="60%"
                                            height="100%"
                                            style={{
                                                objectFit: 'cover',
                                                margin: 'auto',
                                                display: 'block',
                                            }}
                                            autoPlay
                                        >
                                            <source src={image.image} type={image.attachType} />
                                            Your browser does not support the video tag.
                                        </video>
                                    )}
                                </React.Fragment>
                            ))}

                    </div>

                </Carousel.Item>
            ))}
        </Carousel>
    </>);
}
export default BoardImageDetail;