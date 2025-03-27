"use client";

import { useState, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useRouter, usePathname } from "next/navigation";
import {
  CheckCircle,
  XCircle,
  ArrowRight,
  Timer,
  TrophyIcon,
} from "lucide-react";
import { toast } from "sonner";
import * as yup from "yup";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ControlledInput } from "@/components/controlled/controlled-input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { motion, AnimatePresence } from "framer-motion";
import { ConfettiSideButton } from "@/components/fancy/confetti-canons";
import { makeRequestClient } from "@/lib/fetch";
import QuizImage from "@/assets/images/quiz-background.png";
import PenTool from "@/assets/images/pen-tool.svg";

const schema = yup.object().shape({
  full_name: yup.string().trim().required("Name is required"),
  father_name: yup.string().trim().required("Father's Name is required"),
  email: yup
    .string()
    .trim()
    .email("Email is invalid")
    .required("Email is required"),
  whatsapp_number: yup
    .string()
    .trim()
    .required("Whatsapp Number is required")
    .matches(/^[0-9]*$/, "Must be digits only!")
    .length(10),
  address: yup
    .string()
    .trim()
    .required("Address is required")
    .min(5, "Address must be 5 characters long !"),
});

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
      duration: 0.3,
    },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
};

function QuizStart({ quizData, onStartQuiz }) {
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizEnded, setQuizEnded] = useState(false);

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date();
      const startDate = new Date(quizData.startDate);
      const endDate = new Date(quizData.endDate);

      if (now < startDate) {
        // Quiz hasn't started yet
        setQuizStarted(false);
        setQuizEnded(false);
        return {
          days: Math.floor((startDate - now) / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            ((startDate - now) % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          minutes: Math.floor(
            ((startDate - now) % (1000 * 60 * 60)) / (1000 * 60)
          ),
          seconds: Math.floor(((startDate - now) % (1000 * 60)) / 1000),
        };
      }

      if (now >= endDate) {
        // Quiz has ended
        setQuizStarted(false);
        setQuizEnded(true);
        return null;
      }

      // Quiz is active, countdown to endDate
      setQuizStarted(true);
      setQuizEnded(false);
      return {
        days: Math.floor((endDate - now) / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          ((endDate - now) % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        ),
        minutes: Math.floor(((endDate - now) % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor(((endDate - now) % (1000 * 60)) / 1000),
      };
    };

    const interval = setInterval(() => {
      const remaining = calculateTimeRemaining();
      setTimeRemaining(remaining);
      if (!remaining) clearInterval(interval);
    }, 1000);

    return () => clearInterval(interval);
  }, [quizData.startDate, quizData.endDate]);

  return (
    <motion.div
      className="w-full max-w-5xl flex justify-center items-center border-4 border-[#422596] rounded-[18px]"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <Card className="w-full overflow-hidden max-w-full shadow-lg p-5 rounded-[18px]">
        <CardHeader className="text-center">
          <motion.div variants={itemVariants}>
            <div className="mb-2 font-semibold text-lg capitalize">
              {quizEnded ? (
                <h3>Quiz is now closed.</h3>
              ) : quizStarted ? (
                <div className="flex flex-col gap-6">
                  <h3>Quiz is now available !</h3>
                  <h3>Time remaining</h3>
                </div>
              ) : !quizStarted ? (
                <h3>Quiz will be Available in :</h3>
              ) : (
                ""
              )}
            </div>
          </motion.div>
        </CardHeader>
        <CardContent className="flex gap-2 justify-center items-center text-center px-10 -mt-3">
          <motion.div variants={itemVariants} className="">
            {timeRemaining && !quizEnded && (
              <motion.div
                className="flex justify-center gap-3 text-center cursor-default py-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                {Object.entries(timeRemaining).map(([unit, value]) => (
                  <motion.div
                    key={unit}
                    className="bg-[#422596]/10 rounded-xl p-3 w-20 shadow-sm"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.2,
                      ease: "easeOut",
                      delay: 0.1 * Object.keys(timeRemaining).indexOf(unit),
                    }}
                    whileHover={{
                      y: -5,
                      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <div className="text-2xl font-bold text-[#422596]">
                      {value}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {unit.charAt(0).toUpperCase() + unit.slice(1)}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </motion.div>
        </CardContent>
        {quizStarted && !quizEnded ? (
          <CardFooter className="flex justify-center">
            <motion.div
              variants={itemVariants}
              className="flex justify-center items-center w-full"
            >
              <motion.div
                className="flex flex-col justify-center items-center"
                onClick={onStartQuiz}
                initial={{ scale: 1 }}
                whileHover={{
                  boxShadow:
                    "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                  transition: { type: "spring", stiffness: 400, damping: 10 },
                }}
                whileTap={{
                  scale: 0.95,
                  boxShadow:
                    "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                  transition: { type: "spring", stiffness: 400, damping: 10 },
                }}
              >
                <Button
                  className="group w-48 flex justify-center items-center gap-2 bg-transparent border-[3px] border-[#422596] text-[#422596] 
cursor-pointer hover:bg-[#422596] hover:text-white active:scale-95 transition-all text-base"
                  onClick={onStartQuiz}
                >
                  <span>Start Quiz</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-2 active:translate-x-1" />
                </Button>
              </motion.div>
            </motion.div>
          </CardFooter>
        ) : null}
      </Card>
    </motion.div>
  );
}

function UserForm({ onSubmit }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-5xl rounded-[18px] border-4 border-[#422596] flex shadow-lg"
    >
      <div className="hidden lg:flex w-1/2 bg-primary rounded-l-[14px]"></div>
      <div className="lg:w-1/2 w-full p-10 bg-surface rounded-r-[18px] lg:rounded-l-none rounded-l-[18px]">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className=" font-semibold text-center mb-6 ">Your Information</h2>
        </motion.div>
        <form
          onSubmit={handleSubmit(onSubmit, () =>
            toast.error("Please fix form errors!")
          )}
          className="space-y-4 lg:px-10"
        >
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="space-y-2"
          >
            <ControlledInput
              className="ring-2 ring-ring"
              control={control}
              name="full_name"
              label="Full Name"
              placeholder="Enter your Full Name"
            />
          </motion.div>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="space-y-2"
          >
            <ControlledInput
              className="ring-2 ring-ring"
              control={control}
              name="father_name"
              label="Father's Name"
              placeholder="Enter your Father's Name"
            />
          </motion.div>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="space-y-2"
          >
            <ControlledInput
              className="ring-2 ring-ring"
              control={control}
              name="email"
              label="Email"
              placeholder="Enter your Email"
            />
          </motion.div>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="space-y-2"
          >
            <ControlledInput
              className="ring-2 ring-ring"
              control={control}
              name="whatsapp_number"
              label="Whatsapp Number"
              placeholder="Enter your Whatsapp Number"
            />
          </motion.div>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="space-y-2"
          >
            <ControlledInput
              className="ring-2 ring-ring"
              control={control}
              name="address"
              label="Residential Address"
              placeholder="Enter your Address"
            />
          </motion.div>

          <motion.div
            className="flex justify-center pt-5 pb-10"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <Button
              type="submit"
              className="px-6 py-2 rounded-xl bg-transparent hover:bg-[#422596] text-[#422596] hover:text-on-primary font-semibold text-lg shadow-md border-[3px] border-[#422596] transition-transform duration-700"
            >
              Start Now
            </Button>
          </motion.div>
        </form>
      </div>
    </motion.div>
  );
}

function QuizQuestion({ question, currentIndex, totalQuestions, onAnswer }) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [questionStartTime, setQuestionStartTime] = useState(new Date());

  useEffect(() => {
    if (!questionStartTime) return;

    const interval = setInterval(() => {
      const now = new Date();
      const elapsed = Math.floor(
        (now.getTime() - questionStartTime.getTime()) / 1000
      );
      setElapsedTime(elapsed);
    }, 1000);
    return () => clearInterval(interval);
  }, [questionStartTime]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  const handleNext = () => {
    if (selectedAnswer) {
      onAnswer(selectedAnswer, elapsedTime); // Pass elapsedTime as second parameter
      setSelectedAnswer(null);
      setQuestionStartTime(new Date());
      setElapsedTime(0);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-5xl bg-surface flex justify-center items-center border-4 border-[#422596] rounded-[18px]"
    >
      <Card className="w-full max-w-4xl p-10 ">
        <CardHeader className="flex flex-row items-center justify-between">
          <motion.div className="bg-[#422596] px-3 py-1 rounded-3xl w-16 text-base font-medium">
            <p className="text-on-primary text-center">
              Q{currentIndex + 1}/{totalQuestions}
            </p>
          </motion.div>
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className=" text-[#422596] bg-[#422596]/10 px-3 flex justify-between items-center py-1 gap-2 rounded-full text-base font-medium"
          >
            <Timer /> {formatTime(elapsedTime)}
          </motion.div>
        </CardHeader>
        <CardContent className="space-y-6">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <CardTitle className="flex pl-1 justify-start items-center">
              <span className="bg-[#422596] rounded-full h-10 w-10 min-w-10 text-center text-on-primary text-sm flex justify-center items-center">
                {currentIndex + 1}
              </span>
              <h4 className="ml-5">{question.question}</h4>
            </CardTitle>
          </motion.div>
          <RadioGroup
            value={selectedAnswer || ""}
            onChange={(e) => setSelectedAnswer(e.target.value)}
            className="space-y-3 border-none"
          >
            {question.options.map((option, index) => {
              const optionLetter = String.fromCharCode(65 + index); // Convert index to A, B, C, D
              const isSelected = selectedAnswer === option;

              return (
                <motion.div
                  key={index}
                  initial={{ y: 0, opacity: 0, scale: 0.95 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + index * 0.1, duration: 0.4 }}
                  className="group flex items-center p-2 transition-all duration-200 w-full"
                  style={{
                    cursor: `url('${PenTool.src}'), auto`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.cursor = `url('${PenTool.src}'), auto`;
                  }}
                  onClick={() => setSelectedAnswer(option)}
                >
                  {/* Letter Label (A, B, C, D) */}
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-[7px] font-semibold text-sm mr-3 
      ${
        isSelected
          ? "bg-[#422596] text-white"
          : "border-2 border-[#422596] bg-[#422596]/20 text-[#422596] group-hover:bg-[#422596] group-hover:text-white"
      }
      transition-colors duration-200`}
                  >
                    {optionLetter}
                  </div>

                  <RadioGroupItem
                    value={option}
                    id={`option-${index}`}
                    className="hidden border-none"
                  />

                  <Label
                    htmlFor={`option-${index}`}
                    style={{ cursor: `url('${PenTool.src}'), auto` }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.cursor = `url('${PenTool.src}'), auto`;
                    }}
                    className={`flex-grow p-3 rounded-xl border-2 border-[#422596] transition-all duration-300 ease-in-out
      group-hover:shadow-[0.5px_4px_0px_0px_rgb(66, 37, 150)]
      ${isSelected ? "shadow-[0.5px_4px_0px_0px_rgb(66, 37, 150)]" : ""}`}
                  >
                    {option}
                  </Label>
                </motion.div>
              );
            })}
          </RadioGroup>
        </CardContent>
        <CardFooter className="flex justify-end pt-10">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            {currentIndex === totalQuestions - 1 ? (
              <ConfettiSideButton
                className={`font-bold border-2 ${
                  !selectedAnswer
                    ? "bg-transparent border-green-800 text-green-800 cursor-not-allowed"
                    : "bg-green-800 border-green-800 text-on-primary"
                }`}
                onClick={handleNext}
                disabled={!selectedAnswer}
              >
                Finish
              </ConfettiSideButton>
            ) : (
              <Button
                onClick={handleNext}
                disabled={!selectedAnswer}
                className={`w-40 font-bold border-2 ${
                  !selectedAnswer
                    ? "bg-transparent border-[#422596] text-[#422596] cursor-not-allowed"
                    : "bg-[#422596] border-[#422596] text-on-primary"
                }`}
              >
                Next
              </Button>
            )}
          </motion.div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

function QuizResults({
  totalQuestions,
  correctAnswers,
  totalTime,
  userInfo,
  quizData,
  onGoBack,
}) {
  const incorrectAnswers = totalQuestions - correctAnswers;
  const scorePercentage = Math.round((correctAnswers / totalQuestions) * 100);
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = `${(circumference * scorePercentage) / 100} ${
    circumference - (circumference * scorePercentage) / 100
  }`;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-5xl border-[2px] border-[#422596] rounded-[18px] bg-surface flex justify-center items-center relative overflow-hidden"
    >
      {/* Trophy Background Icon */}
      <motion.div
        initial={{ opacity: 0, y: 20, rotate: 20 }}
        animate={{ opacity: 0.2, y: 0, rotate: 20 }}
        transition={{ delay: 0.8, duration: 1 }}
        className="absolute bottom-5 left-3 -mb-4 -ml-5 z-0"
      >
        <TrophyIcon className="w-[30vw] h-[30vw] text-[#422596]/30"></TrophyIcon>
      </motion.div>
      <Card className="w-full max-w-3xl lg:px-10 py-5 z-10 bg-transparent shadow-none">
        <CardHeader>
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <CardTitle className="text-center">
              <h2>{quizData.quizTitle} Score</h2>
            </CardTitle>
          </motion.div>
        </CardHeader>
        <CardContent className="space-y-4 pt-5">
          {userInfo && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="space-y-1 text-left"
            >
              <p className="text-lg font-medium">
                Thank You for Participating,{" "}
                <span className="text-xl capitalize text-primary">
                  {userInfo?.full_name}
                </span>{" "}
                !
              </p>
            </motion.div>
          )}

          <div className="grid md:grid-cols-2 grid-cols-1 gap-6 w-full">
            <div className="flex gap-4 text-center h-36 min-w-40 flex-1">
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="bg-[#422596] text-white p-6 rounded-2xl flex flex-col items-center max-w-xs flex-1"
              >
                <p className="text-lg font-semibold">Correct</p>
                <div className="flex justify-between items-center gap-7 mt-4">
                  <CheckCircle className="h-8 w-8 mt-2" />
                  <div className="text-4xl font-bold mt-1">
                    {correctAnswers}
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="bg-[#cebcff] text-[#422596] p-6 rounded-2xl flex flex-col items-center max-w-xs flex-1"
              >
                <p className="text-lg font-semibold">Incorrect</p>
                <div className="flex justify-between items-center gap-7 mt-4">
                  <XCircle className="h-8 w-8 mt-2" />
                  <div className="text-4xl font-bold mt-1">
                    {incorrectAnswers}
                  </div>
                </div>
              </motion.div>
            </div>
            <div className="flex justify-center">
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
                className="relative"
              >
                <div className="relative w-48 h-48 bg-[#f0d5ca] rounded-full lg:ml-10 lg:mt-10 p-2">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          delay: 0.7,
                          type: "spring",
                          stiffness: 120,
                        }}
                        className="text-4xl font-bold text-[#d2673c]"
                      >
                        {scorePercentage}%
                      </motion.div>
                      <div className="text-sm text-muted-foreground">Score</div>
                    </div>
                  </div>
                  <svg
                    className="w-full h-full -rotate-90"
                    viewBox="0 0 100 100"
                  >
                    <circle
                      className="text-muted-foreground/20"
                      strokeWidth="8"
                      stroke="currentColor"
                      fill="transparent"
                      r={radius}
                      cx="50"
                      cy="50"
                    />
                    <motion.circle
                      className="text-[#d2673c]"
                      strokeWidth="8"
                      strokeDasharray={strokeDasharray}
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="transparent"
                      r={radius}
                      cx="50"
                      cy="50"
                      initial={{ strokeDashoffset: circumference }}
                      animate={{ strokeDashoffset: 0 }}
                      transition={{
                        delay: 0.5,
                        duration: 1.5,
                        ease: "easeOut",
                      }}
                    />
                  </svg>
                </div>
              </motion.div>
            </div>
          </div>

          <div className="flex flex-row justify-between items-center w-full">
            <div className="flex flex-col justify-start items-start w-[80%]">
              <h4 className="">Time Taken</h4>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
                whileHover={{
                  y: -5,
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                }}
                className="bg-[#f0d5ca] py-4 rounded-[18px] w-full text-[#d2673c]"
              >
                <div className="flex justify-center items-center px-5 text-xl font-bold">
                  <Timer className="w-14 h-14 "></Timer>
                  <p className="text-2xl pl-14 tracking-widest">
                    {formatTime(totalTime)}
                  </p>
                </div>
              </motion.div>
            </div>
            <Button onClick={onGoBack}>Back</Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function QuizForm({ quizData }) {
  const [quizState, setQuizState] = useState("not-started");
  const [userInfo, setUserInfo] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState([]);
  const [totalTime, setTotalTime] = useState(0);
  const isFullScreen = quizState !== "not-started";
  const router = useRouter();
  const pathname = usePathname();

  // Enable fullscreen mode on user action
  const enableFullScreen = () => {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    } else {
      return;
    }
  };

  const handleStartQuiz = () => {
    router.replace(`${pathname}?start`, { scroll: false });
    enableFullScreen(); // Only trigger fullscreen on this user action
    setQuizState("user-form");
  };

  const handleGoBack = () => {
    router.replace(pathname, { scroll: false });
    setQuizState("not-started");

    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
  };

  const handleUserFormSubmit = (user) => {
    setUserInfo(user);
    setQuizState("in-progress");
  };

  const handleAnswerQuestion = (answer, timeTaken) => {
    const newResponse = {
      questionId: quizData.questions[currentQuestionIndex].id,
      answer,
      timeTaken,
    };
    const updatedResponses = [...responses, newResponse];
    setResponses(updatedResponses);

    if (currentQuestionIndex < quizData.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      const calculatedTotalTime = updatedResponses.reduce(
        (sum, r) => sum + r.timeTaken,
        0
      );
      setTotalTime(calculatedTotalTime);
      setQuizState("completed");
      submitQuizResults(updatedResponses, calculatedTotalTime);
    }
  };

  const submitQuizResults = async (responses, totalTime) => {
    const score = responses.filter(
      (r, i) => r.answer === quizData.questions[i].correctAnswer
    ).length;

    const submissionData = {
      user: userInfo,
      quizTitle: quizData.quizTitle,
      responses,
      totalTime,
      score,
    };

    console.log("Quiz Submission Data:", submissionData);

    try {
      const response = await fetch("/api/submit-quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submissionData),
      });
      if (!response.ok) throw new Error("Submission failed");
    } catch (err) {
      console.error("Submission error:", err);
    }
  };

  return (
    <div
      onContextMenu={(e) => e.preventDefault()} // Disable right-click
      className={`
        ${
          isFullScreen
            ? "fixed inset-0 z-50 bg-background/80 bg-cover bg-center bg-no-repeat lg:px-10 px-4 select-none flex justify-center items-center"
            : ""
        }
      `}
      style={
        isFullScreen
          ? {
              backgroundImage: `url(${QuizImage.src})`,
              backgroundBlendMode: "multiply", // Adds overlay effect with bg-background/80
            }
          : {}
      }
    >
      <AnimatePresence mode="wait">
        {quizState === "not-started" && (
          <QuizStart quizData={quizData} onStartQuiz={handleStartQuiz} />
        )}
        {quizState === "user-form" && (
          <UserForm onSubmit={handleUserFormSubmit} />
        )}
        {quizState === "in-progress" && (
          <QuizQuestion
            key={`question-${currentQuestionIndex}`}
            question={quizData.questions[currentQuestionIndex]}
            currentIndex={currentQuestionIndex}
            totalQuestions={quizData.questions.length}
            onAnswer={handleAnswerQuestion}
          />
        )}
        {quizState === "completed" && (
          <QuizResults
            totalQuestions={quizData.questions.length}
            correctAnswers={
              responses.filter(
                (r, i) => r.answer === quizData.questions[i].correctAnswer
              ).length
            }
            totalTime={totalTime}
            quizData={quizData}
            userInfo={userInfo}
            onGoBack={handleGoBack}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
