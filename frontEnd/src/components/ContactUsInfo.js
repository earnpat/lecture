import React, { Component } from 'react'
import './ContactUsInfo.css'

export class ContactUsInfo extends Component {
    render() {
        return (
            <div className="container">
                <div>
                    <div className="title">ที่อยู่</div>
                    <div className="contact">
                        xxxxx xxxxx <br/>
                        xxxxxxxxxxx <br/>
                        กรุงเทพมหานคร 10210
                    </div>
                </div>
                <br/>
                <div>
                    <div className="title">ช่องทางการติดต่อ</div>
                    <div className="contact">อีเมลล์ : eiei@lecturely.com</div>
                    <div className="contact">โทรศัพท์ : 0-2xxx-xxxx กด 555</div>
                    <div className="contact">โทรสาร : 0-2xxx-xxxx</div>
                </div>
                <br/>
                <div>
                    <div className="title">ติดตามเรา</div>
                    <span className="follow-us">
                        <a href="https://line.me/th/" target="_blank"><img src="https://uppicimg.com/file/eOZmAwnQ.png"></img></a>
                    </span>
                    <a href="https://www.facebook.com/" target="_blank" className="follow-us"><img src="https://uppicimg.com/file/uJ8n4yi6.png"></img></a>
                    <a href="https://www.instagram.com/" target="_blank" className="follow-us"><img src="https://uppicimg.com/file/TKruMwE5.png"></img></a>
                </div>
            </div>
        )
    }
}

export default ContactUsInfo