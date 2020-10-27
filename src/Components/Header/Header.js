import Axios from 'axios';
import React, { Component } from 'react'
import { Container } from 'react-bootstrap'
export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: '',
        }
    }


    componentDidMount() {
        let uphinh = document.querySelector('#uphinh');
        // uphinh.addEventListener('change', () => {
        //     let pathFile = uphinh.value;
        //     var allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
        //     if (!allowedExtensions.exec(pathFile)) {
        //         alert('Vui lòng upload các file có định dạng: .jpeg/.jpg/.png/.gif only.');
        //     }
        //     else {
        //         let files = uphinh.files;
        //         let reader = new FileReader();
        //         reader.readAsDataURL(files[0])
        //         reader.onload = (e)=>{
        //             Axios.post('http://localhost/APi/upload/uploadImage.php',{file : e.target.result})
        //                     .then(res=>{
        //                         console.log(res)
        //                     })
        //                     .catch(err=>{
        //                         console.log(err);
        //                     })
        //         }
        //     }
        // })
        uphinh.addEventListener('change', (e) => {
            let file = e.target.files[0];
            let src = URL.createObjectURL(file);
        })
    }

    handleImage = e => {
        let image = e.target.files[0];
        this.setState({
            image: URL.createObjectURL(image)
        });

    }
    render() {
        let { image } = this.state;
        let imageUrl = null;
        if (image) {
            imageUrl = (<image className="img img-fluid imgbanner" src={image} />);
        } else {
            imageUrl = (<div className="img img-fluid imgbanner">Choose image</div>);
        }
        return (
            <Container>
                <div id="page-header">
                    <h3>
                        TodoList <small>ReactJs</small>
                    </h3>
                    <hr></hr>
                </div>
                <div className="hinhanh">
                    {imageUrl}
                    <div className="camera">
                        <label>
                            <input type="file" name="" id="uphinh" onChange={this.handleImage} />
                        </label>
                    </div>
                </div>
            </Container>
        )
    }
}
