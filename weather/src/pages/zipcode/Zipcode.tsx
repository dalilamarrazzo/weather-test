import './Zipcode.css';
import { useEffect, useState } from 'react';
import ZippopotamService from './../../services/zippopotam.service';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';


export default Zipcode;

function Zipcode(props: any) {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const coordinateService = new ZippopotamService();
    const coordinates = useSelector((state: any) => state.coordinates);
    const [formData, setFormData] = useState({ zipcode: '.....' });

    useEffect(() => {
        if(coordinates.comuni.length > 0){
            navigateToHome();
        }
    }, [coordinates])

    const navigateToHome = () => {
        navigate('/home');
    }

    const handleInputChange = (event: any, index: number) => {
        const newValue = event.target.value;
        const newZipcode = formData.zipcode.substring(0, index) + newValue + formData.zipcode.substring(index + 1);
        setFormData({ zipcode: newZipcode.slice(0,5) });
    }

    const handleSubmit = (event: any) => {
        event.preventDefault();
        coordinateService.getCoordinates(formData.zipcode, dispatch);
    }

    return (
        <div className='zipcode-container'>
            <div className="zipcode-input-container">
                <h1>Ricerca per CAP</h1>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-4 d-flex" controlId="zipcode">
                    <Form.Control 
                        name="0" 
                        value={formData.zipcode.charAt(0)}
                        onChange={(event) => handleInputChange(event, 0)}
                        required 
                        type="number" 
                        maxLength={1}
                        placeholder="0"
                        onFocus={(event) => event.target.select()} />

                    <Form.Control 
                        name="1" 
                        value={formData.zipcode.charAt(1)}
                        onChange={(event) => handleInputChange(event, 1)}
                        required 
                        type="number" 
                        maxLength={1}
                        placeholder="0"
                        onFocus={(event) => event.target.select()} />

                    <Form.Control 
                        name="2" 
                        value={formData.zipcode.charAt(2)}
                        onChange={(event) => handleInputChange(event, 2)}
                        required 
                        type="number" 
                        maxLength={1}
                        placeholder="0"
                        onFocus={(event) => event.target.select()} />

                    <Form.Control 
                        name="3" 
                        value={formData.zipcode.charAt(3)}
                        onChange={(event) => handleInputChange(event, 3)}
                        required 
                        type="number" 
                        maxLength={1}
                        placeholder="0"
                        onFocus={(event) => event.target.select()} />

                    <Form.Control 
                        name="4" 
                        value={formData.zipcode.charAt(4)}
                        onChange={(event) => handleInputChange(event, 4)}
                        required 
                        type="number" 
                        maxLength={1}
                        placeholder="0"
                        onFocus={(event) => event.target.select()} />
                    </Form.Group>
                <Button className="zipcode-btn" type="submit" disabled={formData.zipcode.includes('.')}>Cerca</Button>
                </Form>
            </div>
        </div>
    );
}