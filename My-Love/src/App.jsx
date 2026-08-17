import { useEffect, useRef, useState } from "react";
import "./App.css";

// ========================================
// หัวใจพื้นหลัง
// ========================================

const backgroundHearts = Array.from({ length: 35 }, (_, index) => ({
  id: index,
  left: Math.random() * 100,
  delay: Math.random() * 8,
  duration: 5 + Math.random() * 7,
  size: 15 + Math.random() * 30,
}));

// ========================================
// หัวใจตอนกด "รัก"
// ========================================

const loveHearts = Array.from({ length: 60 }, (_, index) => ({
  id: index,
  left: Math.random() * 100,
  delay: Math.random() * 2,
  duration: 2 + Math.random() * 3,
  size: 18 + Math.random() * 35,
}));

// ========================================
// รูปภาพ
// เปลี่ยนชื่อไฟล์ตรงนี้ได้
// ========================================

const photos = [
  {
    id: 1,
    image: "/photo1.jpg",
    rotate: "-4deg",
  },
  {
    id: 2,
    image: "/photo2.jpg",
    rotate: "5deg",
  },
  {
    id: 3,
    image: "/photo3.jpg",
    rotate: "-3deg",
  },
  {
    id: 4,
    image: "/photo4.jpg",
    rotate: "4deg",
  },
  {
    id: 5,
    image: "/photo5.jpg",
    rotate: "-5deg",
  },
];

function App() {
  const [showLove, setShowLove] = useState(false);

  const [noPosition, setNoPosition] = useState({
    x: 0,
    y: 0,
  });

  const audioRef = useRef(null);

  // ========================================
  // เมื่อกด "รัก"
  // ========================================

  const handleLoveClick = () => {
    setShowLove(true);

    // เล่นเพลง
    if (audioRef.current) {
      audioRef.current.play().catch((error) => {
        console.log("ไม่สามารถเล่นเพลงได้:", error);
      });
    }

    // เลื่อนไปด้านบน
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ========================================
  // ปุ่ม "ไม่รัก"
  // ========================================

  const handleNoClick = () => {
    setNoPosition({
      x: Math.random() * 180 - 90,
      y: Math.random() * 160 - 80,
    });
  };

  // ========================================
  // Animation รูปเมื่อ Scroll
  // ========================================

  useEffect(() => {
    if (!showLove) return;

    const photoElements =
      document.querySelectorAll(".polaroid");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          }
        });
      },
      {
        threshold: 0.2,
      }
    );

    photoElements.forEach((photo) => {
      observer.observe(photo);
    });

    return () => {
      observer.disconnect();
    };
  }, [showLove]);

  return (
    <div className="app">

      {/* ========================================
          เพลง
      ======================================== */}

      <audio
        ref={audioRef}
        src="/music.mp3"
        loop
      />

      {/* ========================================
          หัวใจพื้นหลัง
      ======================================== */}

      <div className="background-hearts">

        {backgroundHearts.map((heart) => (
          <span
            key={heart.id}
            className="background-heart"
            style={{
              left: `${heart.left}%`,
              animationDelay: `${heart.delay}s`,
              animationDuration: `${heart.duration}s`,
              fontSize: `${heart.size}px`,
            }}
          >
            ❤️
          </span>
        ))}

      </div>


      {/* ========================================
          หน้าคำถาม
      ======================================== */}

      {!showLove ? (

        <div className="question-page">

          <div className="popup">

            <div className="big-heart">
              ❤️
            </div>

            <h1>
              รักเค้าไหม
            </h1>

            <p>
              เลือกคำตอบสิ 💕
            </p>

            <div className="buttons">

              <button
                className="yes-button"
                onClick={handleLoveClick}
              >
                รัก
              </button>

              <button
                className="no-button"
                onClick={handleNoClick}
                style={{
                  transform: `
                    translate(
                      ${noPosition.x}px,
                      ${noPosition.y}px
                    )
                  `,
                }}
              >
                ไม่รัก
              </button>

            </div>

          </div>

        </div>

      ) : (

        /* ========================================
           หน้าหลังจากกดรัก
        ======================================== */

        <div className="love-page">

          {/* =====================================
              หัวใจพุ่งขึ้นเต็มหน้าจอ
          ===================================== */}

          <div className="love-heart-container">

            {loveHearts.map((heart) => (
              <span
                key={heart.id}
                className="love-heart"
                style={{
                  left: `${heart.left}%`,
                  animationDelay: `${heart.delay}s`,
                  animationDuration: `${heart.duration}s`,
                  fontSize: `${heart.size}px`,
                }}
              >
                ❤️
              </span>
            ))}

          </div>


          {/* =====================================
              ข้อความแรก
          ===================================== */}

          <section className="anniversary-intro">

            <div className="big-love-heart">
              💗
            </div>

            <h1>
              รักเบบี้เหมือนกัน
            </h1>

            <p>
              เค้ารักเบบี้ที่สุดเลยนะ 🥰
            </p>

            <div className="scroll-hint">
              ↓
              <br />
              เลื่อนลงดูสิ
            </div>

          </section>


          {/* =====================================
              ส่วนรูปภาพ
          ===================================== */}

          <section className="memory-section">

            <h2>
              Happy Anniversary
            </h2>

            <p className="memory-subtitle">
              ทุกช่วงเวลาที่มีเบบี้ ❤️
            </p>


            <div className="photo-container">

              {photos.map((photo) => (
                <div
                  key={photo.id}
                  className="polaroid"
                  style={{
                    "--rotate": photo.rotate,
                  }}
                >

                  <div className="photo-frame">

                    <img
                      src={photo.image}
                      alt={`memory-${photo.id}`}
                    />

                  </div>

                  <div className="photo-caption">
                    ❤️ Our Memory ❤️
                  </div>

                </div>
              ))}

            </div>


            {/* =================================
                ข้อความท้าย
            ================================= */}

            <div className="final-message">

              <div>
                💕
              </div>

              <h2>
                Happy Anniversary
              </h2>

              <p>
                ขอบคุณที่เข้ามาเป็นความสุขในทุก ๆ วัน
              </p>

              <p>
                อยู่ด้วยกันแบบนี้ไปนาน ๆ นะ ❤️
              </p>

            </div>

          </section>

        </div>

      )}

    </div>
  );
}

export default App;