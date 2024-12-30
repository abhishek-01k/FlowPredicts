import {
  PREDICTION_MARKET_CONTRACT_ABI,
  PREDICTION_MARKET_CONTRACT_ADDRESS,
} from "@/config/contractConfig";
import { wagmiConfig } from "@/config/wagmiConfig";
import { APP_ROUTES } from "@/constants/appRoute";
import { useGlobalContext } from "@/context/GlobalContext";
import { convertToSeconds } from "@/helpers/format";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAccount } from "wagmi";
import { writeContract } from "wagmi/actions";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  question: Yup.string().required("Question is required"),
  imageUrl: Yup.string().url("Invalid URL").required("Image URL is required"),
  bettingDuration: Yup.number()
    .required("Betting duration is required")
    .positive("Must be a positive number"),
  resolutionPeriod: Yup.number()
    .required("Resolution period is required")
    .positive("Must be a positive number")
    .moreThan(
      Yup.ref("bettingDuration"),
      "Resolution period must be greater than betting duration"
    ),
});

type InitialValuesType = {
  question: string;
  imageUrl: string;
  bettingDuration: number;
  resolutionPeriod: number;
};

export function CreatePrediction() {
  const address = useAccount();
  const { refetchActivePredictions } = useGlobalContext();

  const initialValues: InitialValuesType = {
    question: "",
    imageUrl: "",
    bettingDuration: 24,
    resolutionPeriod: 72,
  };

  const navigate = useNavigate();
  const [isLoading, setisLoading] = useState(false);

  const onSubmit = async (values: InitialValuesType) => {
    if (!address || !values) return;

    console.log(values);
    setisLoading(true);
    try {
      const createPredictionTx = await writeContract(wagmiConfig, {
        abi: PREDICTION_MARKET_CONTRACT_ABI,
        address: PREDICTION_MARKET_CONTRACT_ADDRESS,
        functionName: "createPrediction",
        args: [
          values.question,
          values.imageUrl,
          convertToSeconds(values.bettingDuration),
          convertToSeconds(values.resolutionPeriod),
        ],
      });
      console.log("createPredictionTx", createPredictionTx);
      refetchActivePredictions();
      toast.success(`Prediction Created successfully`);
      navigate(APP_ROUTES.PREDICTIONS);
    } catch (error) {
      console.log("Error in creating prediction", error);
      toast.error(`Error in creating prediction`);
    } finally {
      setisLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Create New Prediction</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-6">
            <div className="flex items-start flex-col">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Question
              </label>
              <Field
                type="text"
                name="question"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-background"
                placeholder="What do you want to predict?"
              />
              <ErrorMessage
                name="question"
                component="div"
                className="text-red-600"
              />
            </div>

            <div className="flex items-start flex-col">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image URL
              </label>
              <Field
                type="url"
                name="imageUrl"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-background"
                placeholder="https://example.com/image.jpg"
              />
              <ErrorMessage
                name="imageUrl"
                component="div"
                className="text-red-600"
              />
            </div>

            <div className="flex items-start flex-col">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Betting Duration (in hours)
              </label>
              <Field
                type="number"
                name="bettingDuration"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-background"
              />
              <ErrorMessage
                name="bettingDuration"
                component="div"
                className="text-red-600"
              />
            </div>

            <div className="flex items-start flex-col">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Resolution Period (in hours)
              </label>
              <Field
                type="number"
                name="resolutionPeriod"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-background"
              />
              <ErrorMessage
                name="resolutionPeriod"
                component="div"
                className="text-red-600"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
              disabled={isSubmitting || isLoading}
            >
              {isSubmitting ? "Creating" : "Create Prediction"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
