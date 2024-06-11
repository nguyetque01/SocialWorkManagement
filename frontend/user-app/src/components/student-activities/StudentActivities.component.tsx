import React from 'react';
import "./StudentActivities.scss";

const StudentActivities: React.FC = () => {
    return (
        <div className="container">
            <p className="title">Hoạt động sinh viên</p>
            <div className="imagesContainer">
                <div className="largeImage">
                    <img src="https://dntu.edu.vn/storage/dntu/post/01HZNSPTKQ4ADEDCXCN2A8VAKK.jpg" alt="Large Activity" />
                    <div className="imageText">Large Activity</div>
                </div>
                <div className="smallImages">
                    <div className="smallImage">
                        <img src="https://dntu.edu.vn/storage/dntu/post/niqGSwhMTCCzfyOx680ytSsnZ5cf4j-metaMS5qcGc=-.jpg" alt="Small Activity 1" />
                        <div className="imageText">Small Activity 1</div>
                    </div>
                    <div className="smallImage">
                        <img src="https://dntu.edu.vn/storage/images/resized/dntu-chuyen-xe-ve-que-don-tet-nam-2024.jpg" alt="Small Activity 2" />
                        <div className="imageText">Small Activity 2</div>
                    </div>
                </div>
            </div>
            <div className="bottomImages">
                <div className="bottomImage">
                    <img src="https://dntu.edu.vn/storage/images/resized/tham-gia-dien-tap-phuong-an-chua-chay-cuu-nan-cuu-ho-cnch-phoi-hop-nhieu-luc-luong-tai-trung-tam-thuong-mai-lotte-mart-dong-nai.jpg" alt="Bottom Activity 1" />
                    <div className="bottomImageText">Bottom Activity 1</div>
                </div>
                <div className="bottomImage">
                    <img src="https://dntu.edu.vn/storage/images/resized/ket-qua-hien-mau-tinh-nguyen-lan-1-nam-hoc-2023-2024.jpg" alt="Bottom Activity 2" />
                    <div className="bottomImageText">Bottom Activity 2</div>
                </div>
                <div className="bottomImage">
                    <img src="https://dntu.edu.vn/storage/images/resized/dang-ky-hien-mau-tinh-nguyen-lan-1-nam-hoc-2023-2024-mot-giot-mau-cho-di-mot-cuoc-doi-o-lai.jpg" alt="Bottom Activity 3" />
                    <div className="bottomImageText">Bottom Activity 3</div>
                </div>
                <div className="bottomImage">
                    <img src="https://dntu.edu.vn/storage/images/resized/bao-caotong-ket-chien-dich-thanh-nien-tinh-nguyen-mua-he-xanh-nam-2023.jpg" alt="Bottom Activity 4" />
                    <div className="bottomImageText">Bottom Activity 4</div>
                </div>
            </div>
        </div>
    );
};

export default StudentActivities;
