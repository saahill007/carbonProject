import  { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AddQuestionPage() {
  // keep track of selected options
  const [selectedOption, setSelectedOption] = useState(null);
  const [question, setQuestion] = useState('');
  const navigate = useNavigate();
  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };
  const handleQuestionInputChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleNextPage = (questionType) => {
    // Use the `navigate` function to go to the next page and pass the question as a URL parameter
    navigate(`/questions/${questionType}?question=${question}&source=add`);
  };

  function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
    var results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }

  useEffect(() => {
    const questionValue = getParameterByName('question');
    const inputElement = document.getElementById('myInput');
    if (inputElement) {
      inputElement.value = questionValue || 'Type Your Question Here';
    }
  }, []);

  
  return (
    <div style={{ background: 'white'}}>
    <div style={{width: 1239, height: 760, left: 93, top: 100, position: 'absolute'}}>
        <div style={{width: 1239, height: 754, left: 0, top: 6, position: 'absolute', background: 'rgba(217, 217, 217, 0.12)', borderRadius: 30}} />
    {/* Single/Multiple Choice */}
    <div
        style={{
          width: 457,
          height: 64,
          left: 440,
          top: 238,
          position: "absolute",
          justifyContent: "flex-start",
          alignItems: "center",
          gap: 20,
          display: "inline-flex"
        }}
        onClick={() => handleOptionClick("singleChoice")}
      >
        <div
          style={{
            width: 64,
            height: 60,
            position: "relative",
            background: "white",
            borderRadius: "50%",
            border: "1px #828282 solid",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }} onClick={() => handleNextPage('multiplechoice')}
        >
          {selectedOption === "singleChoice" && (
            <div
              style={{
                width: 32,
                height: 32,
                background: "black",
                borderRadius: "50%"
              }}
            />
          )}
          {selectedOption !== "singleChoice" && (
            <div
              style={{
                width: 32,
                height: 32,
                background: "gray",
                borderRadius: "50%"
              }}
            />
          )}
        </div>
        <div
          style={{
            width: 457,
            height: 29,
            color: "black",
            fontSize: 20,
            fontFamily: "Outfit",
            fontWeight: "500",
            wordWrap: "break-word"
          }}
        >
          Single/Multiple Choice
        </div>
      </div>

      {/* Scale or Rating */}
      <div
        style={{
          width: 457,
          height: 64,
          left: 440,
          top: 327,
          position: "absolute",
          justifyContent: "flex-start",
          alignItems: "center",
          gap: 20,
          display: "inline-flex"
        }}
        onClick={() => handleOptionClick("scaleRating")}
      >
        <div
          style={{
            width: 64,
            height: 60,
            position: "relative",
            background: "white",
            borderRadius: "50%",
            border: "1px #828282 solid",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}onClick={() => handleNextPage('slider')}
        >
          {selectedOption === "scaleRating" && (
            <div
              style={{
                width: 32,
                height: 32,
                background: "black",
                borderRadius: "50%"
              }}
            />
          )}
          {selectedOption !== "scaleRating" && (
            <div
              style={{
                width: 32,
                height: 32,
                background: "gray",
                borderRadius: "50%"
              }}
            />
          )}
        </div>
        <div
          style={{
            width: 457,
            height: 29,
            color: "black",
            fontSize: 20,
            fontFamily: "Outfit",
            fontWeight: "500",
            wordWrap: "break-word"
          }}
        >
          Scale or Rating
        </div>
      </div>

      {/* Dropdown Selection */}
      <div
        style={{
          width: 457,
          height: 64,
          left: 439,
          top: 505,
          position: "absolute",
          justifyContent: "flex-start",
          alignItems: "center",
          gap: 20,
          display: "inline-flex"
        }}
        onClick={() => handleOptionClick("dropdownSelection")}
      >
        <div
          style={{
            width: 64,
            height: 60,
            position: "relative",
            background: "white",
            borderRadius: "50%",
            border: "1px #828282 solid",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}onClick={() => handleNextPage('dropdown')}
        >
          {selectedOption === "dropdownSelection" && (
            <div
              style={{
                width: 32,
                height: 32,
                background: "black",
                borderRadius: "50%"
              }}
            />
          )}
          {selectedOption !== "dropdownSelection" && (
            <div
              style={{
                width: 32,
                height: 32,
                background: "gray",
                borderRadius: "50%"
              }}
            />
          )}
        </div>
        <div
          style={{
            width: 457,
            height: 29,
            color: "black",
            fontSize: 20,
            fontFamily: "Outfit",
            fontWeight: "500",
            wordWrap: "break-word"
          }}
        >
          Dropdown Selection
        </div>
      </div>

      {/* Fill in the blank */}
      <div
        style={{
          width: 457,
          height: 64,
          left: 439,
          top: 416,
          position: "absolute",
          justifyContent: "flex-start",
          alignItems: "center",
          gap: 20,
          display: "inline-flex"
        }}
        onClick={() => handleOptionClick("fillInTheBlank")}
      >
        <div
          style={{
            width: 64,
            height: 60,
            position: "relative",
            background: "white",
            borderRadius: "50%",
            border: "1px #828282 solid",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}onClick={() => handleNextPage('fillintheblanks')}
        >
          {selectedOption === "fillInTheBlank" && (
            <div
              style={{
                width: 32,
                height: 32,
                background: "black",
                borderRadius: "100%"
              }}
            />
          )}
          {selectedOption !== "fillInTheBlank" && (
            <div
              style={{
                width: 32,
                height: 32,
                background: "gray",
                borderRadius: "100%"
              }}
            />
          )}
        </div>
        <div
          style={{
            width: 457,
            height: 29,
            color: "black",
            fontSize: 20,
            fontFamily: "Outfit",
            fontWeight: "500",
            wordWrap: "break-word"
          }}
        >
          Fill in the blank
        </div>
      </div>
        <div style={{width: 1166.66, height: 111, left: 30, top: 20, position: 'absolute'}}>
            <div style={{width: 1166.66, height: 111, left: 0, top: 0, position: 'absolute', background: '#84D2F3', borderRadius: 15}}></div>
            <input
            type="text"
            id="myInput"
        value={question}
        onChange={handleQuestionInputChange}
        placeholder="Type in your question"
        style={{
          width: 1019,
          height: 51,
          left: 30,
          top: 20,
          position: "absolute",
          color: "rgba(0, 0, 0, 0.43)",
          fontSize: 20,
          fontFamily: "Outfit",
          fontWeight: "400",
          wordWrap: "break-word",
          border: "1px solid #ccc",
          padding: "10px", 
          borderRadius: "30"
        }}
      />
        </div>
    </div>
</div>
  );
}
