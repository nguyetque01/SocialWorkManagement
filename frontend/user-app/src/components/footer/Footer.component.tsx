import React from "react";
import "./Footer.scss";
 
const Footer = () => {
  return (
    <div className="footer">
      <iframe 
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.720384945223!2d106.86619157377791!3d10.984465455324452!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174ddb237f9dd59%3A0x3ff1538c511f05d7!2zVHLGsOG7nW5nIMSQ4bqhaSBI4buNYyBDw7RuZyBOZ2jhu4cgxJDhu5NuZyBOYWk!5e0!3m2!1svi!2s!4v1718103323512!5m2!1svi!2s" 
        width="400" 
        height="300" 
        title="Google Map"
        style={{ border: 0 }}
        allowFullScreen 
        loading="lazy"
      ></iframe>
      <div className="contact-info">
        <p>Địa chỉ: 206, Đường Nguyễn Khuyến, KP5, Phường Trảng Dài, TP Biên Hoà, Tỉnh Đồng Nai</p>
        <p>SĐT: 0251 261 2241</p>
        <p>Hotline: 0986 39 7733 - 0904 39 7733</p>
        <p>Email: <a href="mailto:info@dntu.edu.vn">info@dntu.edu.vn</a></p>
      </div>
    </div>
  );
};

export default Footer;
