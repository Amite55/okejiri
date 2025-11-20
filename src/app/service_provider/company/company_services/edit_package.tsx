import { IconDeleteRed, IconEditPenBlack, IconPlusYellow, IconRightArrowBlack, IconUploadImage, IconWatch } from "@/assets/icons";
import CustomTimeModal from "@/src/Components/CustomTimeModal";
import DeliveryTimeModal from "@/src/Components/DeliveryTimeModal";
import BackTitleButton from "@/src/lib/HeaderButtons/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { useAddServiceAvailableTimeMutation, useAddServicePackageDetailItemMutation, useDeleteServicePackageDetailItemMutation, useEditMyServicePackageMutation, useMyServicePackageDetailsQuery, useMyServicePackageMutation, useUpdateServiceAvailableTimeMutation } from "@/src/redux/apiSlices/companyProvider/account/services/packages/packageSlice";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { router, useLocalSearchParams } from "expo-router";
import { FieldArray, Formik } from "formik";
import React, { useEffect, useRef, useState } from "react";
// import { format } from "date-fns";
import {
  ActivityIndicator,

  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SvgXml } from "react-native-svg";


// ------------------ static dropdown value -----------------
const dropdownData = [
  { label: "1 hours", value: "1" },
  { label: "2 hours", value: "2" },
  { label: "3 hours", value: "3" },
  { label: "6 hours", value: "4" },
];
type PackageFormValues = {
  image: any;
  title: string;
  price: string;
  service_details: string[];
  service_details_ids: number[];
  temp_service_input: string;
  available_time_from: string[];
  available_time_to: string[];
  available_time_ids: number[];
  delivery_time: string;
}
const Edit_Package = () => {
  const { id } = useLocalSearchParams();
  console.log("============== package id ================ ", id)
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [modalType, setModalType] = useState<"fixed" | "custom" | null>(null);
  // const [serviceDetails, setServiceDetails] = useState<string[]>([]);
  const fixedModalRef = useRef<BottomSheetModal>(null);
  const customModalRef = useRef<BottomSheetModal>(null);
  const [delivery_time, setDelivery_time] = useState<string>("");

  // ========================== api ========================= //
  const [myServicePackage, {
    isError: isErrorMyServicePackage,
    isLoading: isLoadingMyServicePackage,
    error: errorMyServicePackage
  }] = useMyServicePackageMutation();



  const { data: myServiceDetailsData, isLoading: isLoadingMyServiceDetails, isError: isErrorMyServiceDetails } = useMyServicePackageDetailsQuery(id);
  // const serviceDetails = myServiceDetailsData
  const servicePackages = myServiceDetailsData?.data;

  const [addServicePackageItem, {
    data: addServicePackageItemData,
    isLoading: isLoadingAddServicePackageItem,
    isError: isErrorAddServicePackageItem
  }] = useAddServicePackageDetailItemMutation();

  const [deleteServicePackage, {
    isLoading: isLoadingDeleteServicePackage,
    isError: isErrorDeleteServicePackage
  }] = useDeleteServicePackageDetailItemMutation();

  const [addAvailableTime, { isLoading: isLoadingAddAvailableTime, isError: isErrorAddAvailableTime }] = useAddServiceAvailableTimeMutation()

  const [updateAvailableTime, { isLoading: isLoadingUpdateAvailableTime, error: errorUpdateAvailableTime, isError: isErrorUpdtedAvailableTime }] = useUpdateServiceAvailableTimeMutation()

  const [editPackage, { isLoading: isLoadingEditPackage, isError: isErrorEditPackage, error: errorEditPackage }] = useEditMyServicePackageMutation();
  // =============================== API end ============================ //


  // ===================== validation ==========================
  const validation = (values: any) => {
    const errors: any = {};

    if (!values.image) errors.image = "Service package image is required";
    if (!values.title) errors.title = "Title is required";
    else if (values.title < 3) errors.title = "Title must be at least 3 letters";

    if (!values.price) {
      errors.price = "Service package price is required";
    }
    else if (values.price === 0) {
      errors.price = "Service package price must be greater then 0";
    }

    if (!values.service_details) {
      errors.service_details = "Service package service details is required";
    }

    if (!values.available_time_from) {
      errors.available_time_from = "Available time from is required";
    }
    if (!values.available_time_to) {
      errors.available_time_to = "Available time to is required";
    }
    if (!values.delivery_time) {
      errors.delivery_time = "Delivery time is required";
    }





    return errors;
  }

  // =========================== Image picker ============================ //
  // ---------------------- IMAGE PICKER -------------------------
  const pickImage = async (setFieldValue: any, setFieldTouched: any) => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      alert("Permission needed to access gallery");
      return;
    }

    const result: any = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 0.7,
    });

    if (!result.canceled) {
      const picked = result.assets[0];

      // Extract file extension from URI
      const uriParts = picked.uri.split(".");
      const fileExt = uriParts[uriParts.length - 1]; // e.g., "jpeg", "png"

      // Set name dynamically: user + timestamp + extension
      const fileName = `my_service_package_${Date.now()}.${fileExt}`;

      // Set MIME type dynamically
      const fileType = `image/${fileExt === "jpg" ? "jpeg" : fileExt}`;

      // Set Formik field
      setFieldValue("image", result.assets[0]);
      setFieldTouched("image", true);
    }
  };



  //    ---------------- date picker -----------

  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [currentTimeIndex, setCurrentTimeIndex] = useState<number>(0);
  const [editingField, setEditingField] = useState<"from" | "to">("from")

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode: any) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };
  const formatedDate = (date: Date) => {
    let hours = date.getHours(); // 0-23
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours === 0 ? 12 : hours; // convert 0 => 12

    const hoursStr = hours.toString().padStart(2, "0"); // leading zero
    const minutesStr = minutes.toString().padStart(2, "0");

    return `${hoursStr}:${minutesStr} ${ampm}`;
  }

  const openFixedModal = () => {
    setModalType("fixed");
    fixedModalRef.current?.present();
  }
  const openCustomModal = () => {
    setModalType("custom");
    customModalRef.current?.present();
  }

  const closeAllModal = () => {
    setModalType(null);
    fixedModalRef.current?.dismiss();
    customModalRef.current?.dismiss();
  }
  const closeCustomModal = () => {
    customModalRef.current?.dismiss();
  }

  function convertTo24Hour(time12h: string) {
    const [time, modifier] = time12h.split(" ");
    let [hours, minutes] = time.split(":").map(Number);

    if (modifier === "PM" && hours !== 12) hours += 12;
    if (modifier === "AM" && hours === 12) hours = 0;

    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:00`;
  }


  useEffect(() => {
    if (servicePackages?.delivery_time) {
      setDelivery_time(servicePackages.delivery_time);
    }
  }, [servicePackages]);
  // console.log(" =================== my service package =================== ", JSON.stringify(servicePackages, null, 2))
  // ============================= console.log ======================================= 
  // if (isLoadingMyServiceDetails) {
  //   return (
  //     <View style={tw`flex-1 justify-center items-center`}>
  //       <ActivityIndicator size="large" color="#FF6600" />
  //     </View>
  //   );
  // }

  return (
    // <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <KeyboardAvoidingView
      style={tw`flex-1 bg-base_color`}
      behavior={Platform.OS === "ios" ? "padding" : "position"} // iOS/Android different behavior
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : -120}
    >
      <TouchableWithoutFeedback
        onPress={Keyboard.dismiss}
      >
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          style={tw`flex-grow px-5`}
          contentContainerStyle={tw`pb-6 gap-6`}
          keyboardShouldPersistTaps="handled"
        // enableOnAndroid={true}
        >
          <BackTitleButton
            pageName={"Edit package"}
            onPress={() => router.back()}
            titleTextStyle={tw`text-xl`}
          />
          {isLoadingMyServiceDetails && <ActivityIndicator size={"small"} color={"#FF6600"} />}
          {/* ------------------ Image upload ------------------ */}
          <Formik <PackageFormValues>
            enableReinitialize={true}
            initialValues={{
              image: servicePackages?.image ? { uri: servicePackages?.image, name: "existing.jpg", type: "image/jpeg" } : null,
              title: servicePackages?.title ?? "",
              price: servicePackages?.price ?? "",
              service_details: servicePackages?.package_detail_items?.map((x: any) => x.item) ?? [],
              service_details_ids: servicePackages?.package_detail_items?.map((x: any) => x.id) ?? [],

              temp_service_input: "", // input for service
              available_time_from: servicePackages?.available_time?.map((x: any) => x.available_time_from) ?? [],
              available_time_to: servicePackages?.available_time?.map((x: any) => x.available_time_to) ?? [],
              available_time_ids: servicePackages?.available_time?.map((x: any) => x.id) ?? [],
              delivery_time: servicePackages?.delivery_time ?? "",
            }}
            onSubmit={async (values) => {
              try {
                const formData = new FormData();

                formData.append("service_id", String(id));
                formData.append("title", values.title);
                console.log(" ======== values image ========== ", values.image, " ==== ", values.image.uri.startsWith("http"))
                if (!values.image.uri.startsWith("http")) {
                  formData.append("image", {
                    uri: (values.image as any).uri,
                    name: (values.image as any).name,
                    type: (values.image as any).type
                  } as any);
                }

                formData.append("price", values.price);
                formData.append("delivery_time", delivery_time);


                formData.append("_method", "PUT")


                console.log(" =============== form data ================", JSON.stringify(formData, null, 2));
                // const response = await editPackage({ id: id, requestBody: formData }).unwrap();

                // if (response) {
                //   router.push({
                //     pathname: "/Toaster",
                //     params: {
                //       res: "My service package edited!",
                //     }
                //   })
                //   // ()=> resetForm();
                //   setTimeout(() => {
                //     router.back();
                //   }, 500)
                // }
              } catch (err) {
                console.log("My service package adding failed", JSON.stringify(err))
                router.push({
                  pathname: "/Toaster",
                  params: {
                    res: "My service package added Failed!",
                  }
                })

              }
              console.log("Pressed ")
            }}

          >
            {({ handleChange, errors, touched, setFieldTouched, setFieldValue, values, handleSubmit, resetForm }) => {
              // console.log("=========== values =========", values)
              // if (values.delivery_time) {
              //   setDelivery_time(values.delivery_time)
              // }
              return (
                <View>
                  <Pressable
                    onPress={() => pickImage(setFieldValue, setFieldTouched)}
                    style={tw`border-2 border-dashed border-gray-500 rounded-3xl p-6 justify-center items-center gap-2  `}
                  >
                    {values.image ? (
                      <Image
                        source={(values.image as any).uri}
                        style={tw`h-32 w-32 rounded-3xl`}
                        contentFit="cover"
                      />
                    ) :
                      <View>
                        <SvgXml xml={IconUploadImage} />
                        {/* <Text>Upload Files</Text> */}
                      </View>
                    }
                    {errors.image && touched.image && !values.image ?
                      <Text style={tw`text-redDeep  font-DegularDisplayDemoRegular text-lg`}>
                        {errors.image}
                      </Text> :
                      <Text style={tw`font-DegularDisplayDemoRegular text-lg `}>
                        {!errors.image && values.image ? "Uploaded" : "Upload"} Service Package image
                      </Text>
                    }


                    <TouchableOpacity
                      onPress={() => pickImage(setFieldValue, setFieldTouched)}
                      style={tw`bg-primary rounded-full w-48 h-12 justify-center items-center`}
                    >
                      <Text style={tw`font-DegularDisplayDemoRegular text-xl text-white`}>
                        Browse
                      </Text>
                    </TouchableOpacity>

                  </Pressable>

                  {/*  ---------- message explanation --------------- */}

                  <View style={tw`py-2 `}>
                    <Text
                      style={tw`font-DegularDisplayDemoMedium text-xl text-black py-2 px-2`}
                    >
                      Service title
                    </Text>
                    <TextInput
                      textAlign="left"
                      style={tw`border border-gray-300 h-14 rounded-full px-4 justify-center items-center`}
                      placeholder="Service title goes here"
                      value={values.title}
                      onChangeText={handleChange("title")}
                      placeholderTextColor={"#535353"}
                    // value={}
                    // textAlignVertical="top"
                    />
                  </View>


                  {/* ========== Service details */}
                  <View>
                    <View style={tw`py-2 px-2`}>
                      <Text style={tw`font-DegularDisplayDemoMedium text-xl text-black`}>
                        Service details
                      </Text>
                    </View>

                    <FieldArray
                      name="service_details"

                      render={(arrayHelper) => {
                        return (
                          <View style={tw`border border-gray-300 rounded-3xl p-5 gap-3`}>
                            <View style={tw`flex-row justify-between items-center`}>
                              <View>
                                <TextInput
                                  placeholder="Type here"
                                  placeholderTextColor={"#535353"}
                                  value={values.temp_service_input}
                                  onChangeText={(text) => setFieldValue("temp_service_input", text)}
                                  style={tw`flex-1 mr-3`}
                                />
                              </View>
                              <TouchableOpacity
                                style={tw`w-11 h-11 rounded-full border border-gray-300 justify-center items-center`}

                                onPress={async () => {
                                  Keyboard.dismiss();
                                  const serviceInput = (values.temp_service_input ?? "").toString();
                                  // console.log(" ========== service input ============ ", JSON.stringify(serviceInput, null, 2))
                                  if (!serviceInput.trim()) {
                                    router.push({
                                      pathname: "/Toaster",
                                      params: {
                                        res: "Add service package details"
                                      }
                                    })
                                    return;
                                  }
                                  const item = serviceInput.trim();
                                  const response = await addServicePackageItem({ item, package_id: id }).unwrap();

                                  if (response) {
                                    router.push({
                                      pathname: "/Toaster",
                                      params: {
                                        res: "Add a service detail"
                                      }
                                    })
                                  }

                                  arrayHelper.push(serviceInput.trim())
                                  setFieldValue("temp_service_input", "")
                                  setFieldTouched("service_details", true)

                                }}
                              >
                                <SvgXml xml={IconPlusYellow} />
                              </TouchableOpacity>
                            </View>
                            {/* vaildation error */}
                            {errors.service_details && touched.service_details && (
                              <Text style={tw`text-redDeep font-DegularDisplayDemoRegular`}>
                                {errors.service_details}
                              </Text>
                            )}
                            {/* render item for service details */}
                            {values.service_details.length > 0 && values.service_details.map((item, index) => (
                              <View
                                key={index}
                                style={tw`flex-row justify-between items-center`}
                              >
                                <View style={tw`flex-row items-center gap-2`}>
                                  <View style={tw`w-2 h-2 bg-black rounded-xl`} />
                                  <Text style={tw`text-base font-DegularDisplayDemoRegular pb-1`}>{item}</Text>
                                </View>
                                <TouchableOpacity
                                  onPress={async () => {
                                    const deletedId = values.service_details_ids[index];
                                    if (deletedId) {
                                      const response = await deleteServicePackage(deletedId).unwrap();

                                      if (response) {
                                        router.push({
                                          pathname: "/Toaster",
                                          params: {
                                            res: "A service details deleted"
                                          }
                                        })
                                      }
                                    }

                                    arrayHelper.remove(index)

                                  }}
                                >
                                  <SvgXml xml={IconDeleteRed} />
                                </TouchableOpacity>
                              </View>
                            ))
                            }

                            {/* <View style={tw`flex-row justify-between items-center`}>
                            <View style={tw`flex-row items-center gap-2`}>
                              <View style={tw`w-2 h-2 bg-black rounded-2xl`} />
                              <Text
                                style={tw`font-DegularDisplayDemoRegular text-lg text-regularText`}
                              >
                                Dusting of all surfaces
                              </Text>
                            </View>

                            <TouchableOpacity style={tw`justify-center items-center`}>
                              <SvgXml xml={IconDeleteRed} />
                            </TouchableOpacity>
                          </View>

                          <View style={tw`flex-row justify-between items-center`}>
                            <View style={tw`flex-row items-center gap-2`}>
                              <View style={tw`w-2 h-2 bg-black rounded-2xl`} />
                              <Text
                                style={tw`font-DegularDisplayDemoRegular text-lg text-regularText`}
                              >
                                Dusting of all surfaces
                              </Text>
                            </View>

                            <TouchableOpacity style={tw`justify-center items-center`}>
                              <SvgXml xml={IconDeleteRed} />
                            </TouchableOpacity>
                          </View> */}
                          </View>
                        )
                      }}
                    />



                  </View>

                  <View style={tw`py-2`}>
                    <Text
                      style={tw`font-DegularDisplayDemoMedium text-xl text-black mb-2 ml-2`}
                    >
                      Price
                    </Text>
                    <View
                      style={tw`border  border-gray-300 h-14 rounded-full px-4 flex-row justify-between items-center`}
                    >
                      <TextInput
                        style={tw`flex-1`}
                        placeholder="0.0"
                        value={values.price}
                        onChangeText={handleChange("price")}
                        placeholderTextColor={"#000"}
                        keyboardType="numeric"
                      // value={}
                      // textAlignVertical="top"
                      />
                      <Text
                        style={tw`font-DegularDisplayDemoMedium text-2xl text-black`}
                      >
                        ₦{" "}
                      </Text>
                    </View>
                  </View>

                  {/* ------------------- selected delivery hour -------------- */}
                  {/*  ------------ dropdown section j----------------- */}
                  <View style={tw`py-2`}>
                    <Text
                      style={tw`font-DegularDisplayDemoMedium text-xl text-black mb-2 ml-2`}
                    >
                      Delivery time
                    </Text>
                    <TouchableOpacity onPress={openFixedModal}>
                      <View style={tw`border  border-gray-300 rounded-full py-3 px-4 flex-row justify-between items-center`}>
                        <Text style={tw`font-DegularDisplayDemoRegular text-lg pb-1`}>{delivery_time || "Delivery time"}{" "}{delivery_time > "1" ? "hours" : "hour"}</Text>
                        <SvgXml xml={IconRightArrowBlack} />
                      </View>
                    </TouchableOpacity>


                  </View>

                  {/* -------------- from time and to time ---------------- */}
                  <FieldArray
                    name="available_time_from"
                    render={(arrayHelper) => (
                      <View>
                        <View style={tw`flex-row justify-between items-center px-2 py-2`}>
                          <Text
                            style={tw`font-DegularDisplayDemoMedium text-xl text-black  pb-1`}
                          >
                            Available time
                          </Text>
                          <TouchableOpacity
                            style={tw`w-11 h-11 rounded-full border border-gray-300 justify-center items-center`}
                            onPress={async () => {
                              const defaultTimeFrom = "09:00 AM";
                              const defaultTimeTo = "10:00 AM";
                              const response = await addAvailableTime({
                                package_id: id,
                                available_time_from: defaultTimeFrom,
                                available_time_to: defaultTimeTo
                              }).unwrap();
                              if (response) {
                                router.push({
                                  pathname: "/Toaster",
                                  params: {
                                    res: "Add an available time"
                                  }
                                })
                              }


                              arrayHelper.push(defaultTimeFrom); // new 
                              setFieldValue("available_time_to", [...values.available_time_to, defaultTimeTo])
                            }}
                          >
                            <SvgXml xml={IconPlusYellow} />
                          </TouchableOpacity>
                        </View>
                        {/* render times */}
                        {values.available_time_from.map((from: string, index: number) => (
                          <View key={index} style={tw`flex-row justify-between items-center gap-2 py-2 px-2`}>

                            <TouchableOpacity
                              onPress={() => {
                                setCurrentTimeIndex(index);
                                setEditingField("from");
                                showTimepicker();
                              }}
                              style={tw`flex-row  gap-2 w-[44%] py-2 justify-between px-3 items-center border border-gray-400 rounded-2xl`}
                            >
                              <View style={tw`flex-row items-center justify-center gap-2`}>
                                <SvgXml xml={IconWatch} />
                                <Text style={tw`font-DegularDisplayDemoMedium text-lg pb-1`}>{from || "From"}</Text>
                              </View>
                              <View>
                                <SvgXml xml={IconEditPenBlack} width={15} />
                              </View>

                            </TouchableOpacity>


                            <TouchableOpacity
                              onPress={() => {
                                setCurrentTimeIndex(index);
                                setEditingField("to");
                                showTimepicker();
                              }}
                              style={tw`flex-row justify-between px-3 items-center  w-[44%] gap-2  py-2 border border-gray-400 rounded-2xl`}
                            >
                              <View style={tw`flex-row items-center gap-2`}>
                                <SvgXml xml={IconWatch} />
                                <Text style={tw`font-DegularDisplayDemoMedium text-lg pb-1`}>
                                  {values.available_time_to[index] || "To"}
                                </Text>
                              </View>

                              <SvgXml xml={IconEditPenBlack} width={15} />
                            </TouchableOpacity>
                            {/* <TouchableOpacity
                              onPress={() => {

                                arrayHelper.remove(index);
                                const updatedTo = [...values.available_time_to];
                                updatedTo.splice(index, 1);
                                setFieldValue("available_time_to", updatedTo);

                              }}
                            >
                              <SvgXml xml={IconDeleteRed} />
                            </TouchableOpacity> */}
                          </View>
                        ))}
                        {/* show time picker */}
                        {show && (
                          <DateTimePicker
                            testID="dateTimePicker"
                            value={date}
                            mode={mode}
                            is24Hour={false}
                            onChange={async (event, selectedDate) => {
                              const currentDate = selectedDate || date;
                              setShow(false);
                              setDate(currentDate);

                              const formated = formatedDate(currentDate)


                              if (editingField === "from") {
                                const updated = [...values.available_time_from];
                                updated[currentTimeIndex] = formated;
                                setFieldValue("available_time_from", updated);
                              } else if (editingField === 'to') {
                                const updated = [...values.available_time_to];
                                updated[currentTimeIndex] = formated;
                                setFieldValue("available_time_to", updated);
                              }

                              const timeId = values.available_time_ids[currentTimeIndex];
                              console.log(" ============ time id ============== ", timeId);

                              if (timeId) {
                                // Determine the new from and to values
                                if (editingField === "from" && formated === values.available_time_from[currentTimeIndex]) {
                                  return;
                                }
                                if (editingField === "to" && formated === values.available_time_to[currentTimeIndex]) {
                                  return;
                                }
                                const newFrom = editingField === "from" ? formated : values.available_time_from[currentTimeIndex];
                                const newTo = editingField === "to" ? formated : values.available_time_to[currentTimeIndex];

                                // Convert times to comparable Date objects
                                const fromDate = new Date(`1970-01-01T${convertTo24Hour(newFrom)}`);
                                const toDate = new Date(`1970-01-01T${convertTo24Hour(newTo)}`);

                                // Check if "to" is after "from"
                                if (toDate <= fromDate) {
                                  router.push({
                                    pathname: "/Toaster",
                                    params: { res: `"To" time must be after "From" time` },
                                  });
                                  return; // stop here, don't call API
                                }
                                try {
                                  const body = {
                                    available_time_from: editingField === "from" ? formated : values.available_time_from[currentTimeIndex],
                                    available_time_to: editingField === "to" ? formated : values.available_time_to[currentTimeIndex],
                                    _method: "PUT"
                                  }
                                  // console.log("============== body ================ ", body)
                                  const response = await updateAvailableTime({
                                    id: timeId,
                                    requestBody: body
                                  }).unwrap()
                                  // console.log("=============== response time ===================== ", response)

                                  if (response) {
                                    router.push({
                                      pathname: "/Toaster",
                                      params: {
                                        res: "Updated an available time"
                                      }
                                    })
                                  }
                                } catch (err) {
                                  router.push({
                                    pathname: "/Toaster",
                                    params: {
                                      res: "Updated an available time failed!"
                                    }
                                  })
                                  console.log("error ============ ", err, " == api error == ", errorUpdateAvailableTime)
                                }

                              }


                            }}
                          />
                        )

                        }
                      </View>
                    )}

                  />



                  {/* ----------------------- submit password -------------- */}
                  <TouchableOpacity
                    onPress={handleSubmit}
                    style={tw`px-2 py-4`}
                  >
                    <View style={tw`flex-row bg-primary py-4 rounded-full justify-center gap-2 items-center`}>
                      {isLoadingEditPackage && <ActivityIndicator size={"small"} color={"#fff"} />}
                      <Text style={tw`text-white font-DegularDisplayDemoMedium text-lg`}>Add</Text>
                    </View>
                  </TouchableOpacity>
                  {/* <PrimaryButton
                  onPress={handleSubmit}
                  // onPress={() =>
                  //   router.push("/service_provider/individual/my_services/my_service")
                  // }
                  titleProps="Add"
                  // IconProps={IconRightArrow}
                  contentStyle={tw`mt-4`}
                /> */}
                  {/* <View style={tw`absolute`}> */}


                </View>
              )
            }

            }

          </Formik>

        </ScrollView>
      </TouchableWithoutFeedback>
      <DeliveryTimeModal
        ref={fixedModalRef}
        onClose={closeAllModal}
        onSelect={(value: any) => {
          if (value === "custom") {
            fixedModalRef?.current?.dismiss();
            customModalRef?.current?.present();
          } else {
            setDelivery_time(value);
            fixedModalRef.current?.dismiss();
          }
        }}
      />
      {/* </View> */}


      <CustomTimeModal
        ref={customModalRef}
        onBack={() => {
          customModalRef?.current?.dismiss();
          fixedModalRef?.current?.present();
        }}
        onSave={(value: any) => {
          setDelivery_time(value);
          closeAllModal();
        }}
        onClose={() => {
          customModalRef.current?.dismiss();
          fixedModalRef.current?.dismiss();
        }}
      />
    </KeyboardAvoidingView >
    // </TouchableWithoutFeedback >
  );
};

export default Edit_Package;

const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 100,
    paddingHorizontal: 24,
  },
  icon: {
    marginRight: 5,
  },

  placeholderStyle: {
    fontSize: 18,
  },
  selectedTextStyle: {
    fontSize: 18,
  },
  textArea: {
    borderWidth: 1,
    borderColor: "gray",
    paddingVertical: 14,
    paddingHorizontal: 20,
    minHeight: 100,
    maxHeight: 150,
    borderRadius: 20,
  },
});
