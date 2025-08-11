import React, { useState, useEffect } from "react";
import { FaPlay, FaCode, FaEye } from "react-icons/fa";

const CodePlayground = () => {
  const [activeTab, setActiveTab] = useState("html");
  const [htmlCode, setHtmlCode] = useState(`<div class="container">
  <h1>Hello World!</h1>
  <p>Welcome to Code Buddy</p>
  <button onclick="changeColor()">Change Color</button>
</div>`);

  const [cssCode, setCssCode] = useState(`.container {
  text-align: center;
  padding: 20px;
  font-family: Arial, sans-serif;
}

h1 {
  color: #3b82f6;
  margin-bottom: 10px;
}

p {
  color: #666;
  font-size: 18px;
}

button {
  background-color: #3b82f6;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
}

button:hover {
  background-color: #2563eb;
}`);

  const [jsCode, setJsCode] = useState(`function changeColor() {
  const h1 = document.querySelector('h1');
  const colors = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b'];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  h1.style.color = randomColor;
}`);

  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);

  const generateOutput = () => {
    setIsRunning(true);
    setTimeout(() => {
      const fullCode = `
<!DOCTYPE html>
<html>
<head>
  <style>${cssCode}</style>
</head>
<body>
  ${htmlCode}
  <script>${jsCode}</script>
</body>
</html>
      `;
      setOutput(fullCode);
      setIsRunning(false);
    }, 300);
  };

  useEffect(() => {
    generateOutput();
  }, []);

  const handleCodeChange = (value) => {
    switch (activeTab) {
      case "html":
        setHtmlCode(value);
        break;
      case "css":
        setCssCode(value);
        break;
      case "js":
        setJsCode(value);
        break;
    }
  };

  const getCurrentCode = () => {
    switch (activeTab) {
      case "html":
        return htmlCode;
      case "css":
        return cssCode;
      case "js":
        return jsCode;
      default:
        return "";
    }
  };

  const resetCode = () => {
    setHtmlCode(`<div class="container">
  <h1>Hello World!</h1>
  <p>Welcome to Code Buddy</p>
  <button onclick="changeColor()">Change Color</button>
</div>`);
    setCssCode(`.container {
  text-align: center;
  padding: 20px;
  font-family: Arial, sans-serif;
}

h1 {
  color: #3b82f6;
  margin-bottom: 10px;
}

p {
  color: #666;
  font-size: 18px;
}

button {
  background-color: #3b82f6;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
}

button:hover {
  background-color: #2563eb;
}`);
    setJsCode(`function changeColor() {
  const h1 = document.querySelector('h1');
  const colors = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b'];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  h1.style.color = randomColor;
}`);
  };

  return (
    <section className="py-20 bg-primary-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Try It Yourself
          </h2>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto">
            Experiment with HTML, CSS, and JavaScript code. Make changes and see
            the results instantly!
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            <div className="bg-black/90">
              <div className="flex border-b border-white/10">
                {[
                  { id: "html", label: "HTML", icon: FaCode },
                  { id: "css", label: "CSS", icon: FaCode },
                  { id: "js", label: "JavaScript", icon: FaCode },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center px-6 py-3 font-medium transition-colors ${
                      activeTab === tab.id
                        ? "bg-primary-600 text-white border-b-2 border-primary-400"
                        : "text-gray-300 hover:text-white hover:bg-gray-800"
                    }`}
                  >
                    <tab.icon className="mr-2" />
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Code Editor */}
              <div className="p-4">
                <textarea
                  value={getCurrentCode()}
                  onChange={(e) => handleCodeChange(e.target.value)}
                  className="w-full h-80 bg-white/10 text-blue-400 font-mono text-sm p-4 rounded-lg border
                   border-white/10 focus:outline-none focus:border-primary-500 resize-none"
                  spellCheck="false"
                  placeholder={`Enter your ${activeTab.toUpperCase()} code here...`}
                />
              </div>

              {/* Controls */}
              <div className="px-4 pb-4 flex space-x-3">
                <button
                  onClick={generateOutput}
                  disabled={isRunning}
                  className={`px-4 py-2 rounded-lg font-medium flex items-center transition-colors ${
                    isRunning
                      ? "bg-gray-600 text-gray-300 cursor-not-allowed"
                      : "bg-primary-600 hover:bg-primary-700 text-white"
                  }`}
                >
                  <FaPlay className="mr-2" />
                  {isRunning ? "Running..." : "Run Code"}
                </button>
                <button
                  onClick={resetCode}
                  className="btn-primary text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Reset
                </button>
              </div>
            </div>

            {/* Output */}
            <div className="bg-white">
              <div className="flex items-center justify-between px-6 py-3 bg-gray-50 border-b border-gray-200">
                <div className="flex items-center">
                  <FaEye className="text-gray-600 mr-2" />
                  <span className="font-medium text-gray-700">
                    Live Preview
                  </span>
                </div>
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>
              </div>

              <div className="h-96 overflow-auto bg-white">
                {output ? (
                  <iframe
                    srcDoc={output}
                    className="w-full h-full border-0"
                    sandbox="allow-scripts"
                    title="Code Output"
                    key={output}
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-500">
                    <div className="text-center">
                      <FaCode className="text-4xl mb-4 mx-auto" />
                      <p>Click "Run Code" to see your output</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Tipps */}
        <div className="mt-8 bg-white/10 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-3">Tips:</h3>
          <ul className="text-blue-100 space-y-1 text-sm">
            <li>• Try changing the colors in the CSS</li>
            <li>• Add more HTML elements like images or lists</li>
            <li>• Modify the JavaScript to add more interactive features</li>
            <li>• Experiment with different CSS properties like animations</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default CodePlayground;
