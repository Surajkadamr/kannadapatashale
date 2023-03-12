import React from "react";

function Videocard({ title, category, videolink }) {
  const type = [
    "ಭಾಷೆ ಮತ್ತು ಭಾಷಾವಿಜ್ಞಾನ",
    "ಕನ್ನಡ ಭಾಷಾ ಚರಿತ್ರೆ",
    "ತೌಲನಿಕ ದ್ರಾವಿಡ ಭಾಷಾವಿಜ್ಞಾನ",
    "ಕನ್ನಡ ವ್ಯಾಕರಣ",
    "ಕನ್ನಡ ಛಂದಸ್ಸು",
    "ಭಾರತೀಯ ಕಾವ್ಯಮೀಮಾಂಸೆ",
    "ಪಾಶ್ಚಾತ್ಯ ಕಾವ್ಯಮೀಮಾಂಸೆ",
    "ಕನ್ನಡ ಕಾವ್ಯಮೀಮಾಂಸೆ",
    "ಸಾಹಿತ್ಯ ವಿಮರ್ಶೆ",
    "ಜಾನಪದ ಅಧ್ಯಯನ",
    "ಕನ್ನಡದಲ್ಲಿ ಗ್ರಂಥ ಸಂಪಾದನೆ",
    "ಕನ್ನಡದಲ್ಲಿ  ಸಂಶೋಧನೆ",
    "ಸಾಂಸ್ಕೃತಿಕ ಅಧ್ಯಯನ",
    "ತೌಲನಿಕ‌ ಸಾಹಿತ್ಯ",
    "ಅನುವಾದ ಸಾಹಿತ್ಯ",
  ];
  return (
    <div className="md:mx-auto">
      <div className="max-w-full md:w-1/2 mx-4 my-3 md:mx-auto p-4 md:p-6 bg-white border border-gray-200 rounded-lg shadow-md ">
        <h5 className="mb-5 text-sm md:text-xl py-4 font-bold tracking-tight px-3 rounded-md bg-orange-100 text-gray-900 ">
          {type[category.slice(1, 2) - 1]}
        </h5>
        <div className="flex justify-between">
          <iframe
            width="360"
            height="200"
            src={videolink}
            className="mx-auto"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </div>
        <p className="m-5 font-bold text-center">{title}</p>
      </div>
    </div>
  );
}

export default Videocard;
