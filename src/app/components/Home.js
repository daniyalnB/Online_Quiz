import React, { useState, useEffect } from "react";
import { Resizable, ResizableBox } from "react-resizable";
import styled from "styled-components";
import { Rnd } from "react-rnd";


const StyledRnd = styled(Rnd)`
  border: 1px solid blue;
`;

const Item = styled.div`
  border: 1px solid black;
`;

const Container = styled.div`
  width: 800px;
  height: 800px;
  border: 1px solid red;
`;


const Home = () => {

  const [file, setFile] = useState();

  function handleChange(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
  }

  const [formFields, setFormFields] = useState([]);
  console.log(formFields, "formFields")

  const handleFormChange = (event, index) => {
    const data = [...formFields];
    data [index][event.target.name] = event.target.files[0];
    setFormFields(data);
  };

  const addFields = (event) => {
    console.log(event)
    let object = {
      image: "",
    };
    setFormFields([...formFields, object]);
    // handleFormChange(event);
  };

  const removeFields = (index) => {
    let data = [...formFields];
    data.splice(index, 1);
    setFormFields(data);
  };

  const [position, setPosition] = useState({
    x: 0,
    y: 0,
    width: 100,
    height: 100,
  });

  function onResize(event, direction, ref, delta) {
    const { width, height } = ref.style;

    setPosition((prevPosition) => ({
      ...prevPosition,
      width,
      height,
    }));
  }

  function onDragStop(e, d) {
    const { x, y } = d;
    setPosition((prevPosition) => ({
      ...prevPosition,
      x,
      y,
    }));
  }


  return (
		<>
      {/* {file && (
        <Resizable>
          <div>
            <img src={file} style={{ width: "200px" }} />
          </div>
        </Resizable>
      )}

      <ResizableBox width={200} height={200} minConstraints={[100, 100]} maxConstraints={[300, 300]}>
      <span>Contents</span>
    </ResizableBox> */}

      {/* <div>
        <h2>Add Image:</h2>
          <input type="file" onChange={handleChange} />
      </div> */}
      

      <Container>
        {formFields.map((index) => {
          return ( 
            <StyledRnd
              key={index}
              default={position}
              onResize={onResize}
              onDragStop={onDragStop}
              bounds="parent"
              lockAspectRatio={true}
            >
              <div style={{ backgroundImage: `url(${file})`, backgroundSize: "100% 100%",  width: "100%", height: "100%" }}>
              </div>
            </StyledRnd> 
          );
        })}
        
      </Container>

      {/* <div>
        <h2>Add Image:</h2>
          <input type="file" onChange={handleChange} />
      </div> */}

      <div>
        <input
          type="file"
          name="image"
          accept="image/png, image/jpg, image/jpeg"
          onChange={event => addFields(event)}
          onClick={(e) => (e.target.value = null)}
        />
      </div>
		</>
	);
};

export default Home;