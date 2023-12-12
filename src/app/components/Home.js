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

  const [c, setC] = useState(0);

  const handleFormChange = (event) => {
    console.log(event)
    const data = [...formFields];
    data [c][event.target.name] = event.target.files ? URL.createObjectURL(event.target.files[0]) : event.target.value;
    setFormFields(data);
    setC(c + 1);
  };

  const addFields = () => {
    let object = {
      image: "",
    };
    setFormFields([...formFields, object]);
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
        {formFields.map((form, index) => {
          return ( 
            <StyledRnd
              key={index}
              default={position}
              onResize={onResize}
              onDragStop={onDragStop}
              bounds="parent"
              lockAspectRatio={true}
            >
              <div style={{ backgroundImage: `url(${form.image})`, backgroundSize: "100% 100%",  width: "100%", height: "100%" }}>
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
          onChange={event => {
            addFields();
            handleFormChange(event);
          }}
          onClick={(e) => (e.target.value = null)}
        />
      </div>
		</>
	);
};

export default Home;