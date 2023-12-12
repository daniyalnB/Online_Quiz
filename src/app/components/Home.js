import React, { useState, useEffect } from "react";
import { Resizable, ResizableBox } from "react-resizable";
import styled from "styled-components";
import { Rnd } from "react-rnd";

const StyledRnd = styled(Rnd)`
  border: 1px solid blue;
`;

const Container = styled.div`
  width: 800px;
  height: 800px;
  border: 1px solid red;
`;

const Home = () => {

  const [file, setFile] = useState();

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

  const [selectedImages, setSelectedImages] = useState([]);
  console.log(selectedImages, "selectedImages");

  const handleImageChange = (e) => {
    const files = e.target.files;
    const selected = [];

    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();

      reader.onload = (event) => {
        selected.push({ file: files[i], src: event.target.result });
        if (selected.length === files.length) {
          setSelectedImages(selected);
        }
      };

      reader.readAsDataURL(files[i]);
    }
  };

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
        {selectedImages.map((image, index) => {
          return ( 
            <StyledRnd
              key={index}
              default={position}
              onResize={onResize}
              onDragStop={onDragStop}
              bounds="parent"
              lockAspectRatio={true}
            >
              <div
                style={{
                  backgroundImage: `url(${image.src})`,
                  backgroundSize: "100% 100%",
                  width: "100%",
                  height: "100%",
                }}
              >
              </div>
            </StyledRnd> 
          );
        })}
        
      </Container>
      <input type="file" accept="image/*" multiple onChange={handleImageChange} />
		</>
	);
};

export default Home;