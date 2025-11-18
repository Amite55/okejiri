import { IconDeleteRed, IconEditPenBlack, IconPlusYellow, IconRightArrowBlack, IconUploadImage, IconWatch } from "@/assets/icons";
import CustomTimeModal from "@/src/Components/CustomTimeModal";
import DeliveryTimeModal from "@/src/Components/DeliveryTimeModal";
import BackTitleButton from "@/src/lib/HeaderButtons/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { useMyServicePackageMutation } from "@/src/redux/apiSlices/companyProvider/account/services/packages/packageSlice";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from "expo-image-picker";
import { router, useLocalSearchParams } from "expo-router";
import { FieldArray, Formik } from "formik";
import React, { useRef, useState } from "react";
// import { format } from "date-fns";
import {
  ActivityIndicator,
  Image,
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
  temp_service_input: string;
  available_time_from: string[];
  available_time_to: string[];
  delivery_time: string;
}
const Add_Package = () => {
  const { id } = useLocalSearchParams();

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
      setFieldValue("image", {
        uri: picked.uri,
        name: fileName,
        type: fileType,
      });
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


  return (
    // <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <KeyboardAvoidingView
      style={tw`flex-1 bg-base_color`}
      behavior={Platform.OS === "ios" ? "padding" : "position"} // iOS/Android different behavior
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : -120}
    >
      <TouchableWithoutFeedback
        onPress={Keyboard.dismiss} accessible={false}
      >
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          style={tw`flex-grow px-5`}
          contentContainerStyle={tw`pb-6 gap-6`}
          keyboardShouldPersistTaps="handled"
        >
          <BackTitleButton
            pageName={"Add package"}
            onPress={() => router.back()}
            titleTextStyle={tw`text-xl`}
          />

          {/* ------------------ Image upload ------------------ */}
          <Formik <PackageFormValues>
            initialValues={{
              image: "",
              title: "",
              price: "",
              service_details: [],
              temp_service_input: "", // input for service
              available_time_from: [],
              available_time_to: [],
              delivery_time: "",
            }}
            onSubmit={async (values) => {
              if (!id || !delivery_time || !values.image || !values.title || values.service_details.length === 0 || !values.available_time_from || !values.available_time_to) {
                router.push({
                  pathname: "/Toaster",
                  params: {
                    res: "Fill up all required fields"
                  }
                })
                return;
              }
              const pairedTimes = values.available_time_from.map((from, index) => ({
                from: from?.trim() || "",
                to: values.available_time_to[index]?.trim() || ""
              }));

              const validTime = pairedTimes.filter(x => x.from && x.to);

              // Check that each "from" is before its corresponding "to"
              const invalidTimeIndex = validTime.findIndex(x => new Date(`1970-01-01T${x.from}`) >= new Date(`1970-01-01T${x.to}`));

              if (validTime.length === 0) {
                router.push({
                  pathname: "/Toaster",
                  params: { res: "Please add at least one valid available time range" }
                });
                return;
              }

              if (invalidTimeIndex !== -1) {
                router.push({
                  pathname: "/Toaster",
                  params: { res: `Available time range #${invalidTimeIndex + 1} is invalid. "To" must be after "From"` }
                });
                return;
              }

              const final_available_time_from = validTime.map(x => x.from);
              const final_available_time_to = validTime.map(x => x.to);





              try {
                const formData = new FormData();

                formData.append("service_id", String(id));
                formData.append("title", values.title);
                formData.append("image", {
                  uri: (values.image as any).uri,
                  name: (values.image as any).name || "photo.jpg",
                  type: (values.image as any).type || "image/jpeg"
                } as any);
                formData.append("price", values.price);
                formData.append("delivery_time", delivery_time);


                values.service_details.forEach((item, index) => {
                  formData.append(`service_details[${index}]`, item);
                });

                const normalizeTime = (time: string) => time.replace(/\u202F/g, " ");

                final_available_time_from.forEach((from, index) => {
                  formData.append(`available_time_from[${index}]`, normalizeTime(from));
                });

                final_available_time_to.forEach((to, index) => {
                  formData.append(`available_time_to[${index}]`, normalizeTime(to));
                });


                // console.log(" =============== form data ================", JSON.stringify(formData, null, 2));
                const response = await myServicePackage(formData).unwrap();

                if (response) {
                  router.push({
                    pathname: "/Toaster",
                    params: {
                      res: "My service package added!",
                    }
                  })
                  // ()=> resetForm();
                  
                }
                setTimeout(() => {
                    router.back();
                  }, 200)
              } catch (err) {
                router.push({
                  pathname: "/Toaster",
                  params: {
                    res: "My service package added Failed!",
                  }
                })
                console.log("My service package adding failed", err)
              }
              console.log("Pressed ")
            }}

          >
            {({ handleChange, errors, touched, setFieldTouched, setFieldValue, values, handleSubmit, resetForm }) => (
              <View>
                <Pressable
                  onPress={() => pickImage(setFieldValue, setFieldTouched)}
                  style={tw`border-2 border-dashed border-gray-500 rounded-3xl p-6 justify-center items-center gap-2  `}
                >
                  {values.image ? (
                    <Image
                      source={{ uri: (values.image as any).uri }}
                      style={tw`h-32 w-32 rounded-3xl`}
                      resizeMode="cover"
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

                  {!values.image &&
                    <TouchableOpacity
                      onPress={() => pickImage(setFieldValue, setFieldTouched)}
                      style={tw`bg-primary rounded-full w-48 h-12 justify-center items-center`}
                    >
                      <Text style={tw`font-DegularDisplayDemoRegular text-xl text-white`}>
                        Browse
                      </Text>
                    </TouchableOpacity>
                  }
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
                            <TextInput
                              placeholder="Type here"
                              placeholderTextColor={"#535353"}
                              value={values.temp_service_input}
                              onChangeText={(text) => setFieldValue("temp_service_input", text)}
                              style={tw`flex-1 mr-3`}
                            />
                            <TouchableOpacity
                              style={tw`w-11 h-11 rounded-full border border-gray-300 justify-center items-center`}
                              onPress={() => {
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
                                onPress={() => arrayHelper.remove(index)}
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
                  {/* <Text
                    style={tw`font-DegularDisplayDemoMedium text-xl text-black mb-2 ml-2`}
                  >
                    Reason
                  </Text> */}
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
                          onPress={() => {
                            arrayHelper.push(""); // new 
                            setFieldValue("available_time_to", [...values.available_time_to, ""])
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
                          <TouchableOpacity
                            onPress={() => {

                              arrayHelper.remove(index);
                              const updatedTo = [...values.available_time_to];
                              updatedTo.splice(index, 1);
                              setFieldValue("available_time_to", updatedTo);

                            }}
                          >
                            <SvgXml xml={IconDeleteRed} />
                          </TouchableOpacity>
                        </View>
                      ))}
                      {/* show time picker */}
                      {show && (
                        <DateTimePicker
                          testID="dateTimePicker"
                          value={date}
                          mode={mode}
                          is24Hour={false}
                          onChange={(event, selectedDate) => {
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
                          }}
                        />
                      )

                      }
                    </View>
                  )}

                />



                {/* <View style={tw`flex-row justify-between items-center px-2 py-2`}>
                  <Text
                    style={tw`font-DegularDisplayDemoMedium text-xl text-black  pb-1`}
                  >
                    Available time
                  </Text>
                  <TouchableOpacity
                    style={tw`w-11 h-11 rounded-full border border-gray-300 justify-center items-center`}
                    onPress={() => {
                      
                    }}
                  >
                    <SvgXml xml={IconPlusYellow} />
                  </TouchableOpacity>
                </View>

                <View style={tw`flex-row items-center gap-3`}>
                  {/*  from time ------- */}
                {/* <TouchableOpacity
                  onPress={showTimepicker}
                  style={tw`flex-1 flex-row justify-center items-center gap-2 border h-14 rounded-3xl border-gray-300`}
                >
                  <SvgXml xml={IconWatch} />
                  <Text
                    style={tw`font-DegularDisplayDemoMedium text-xl text-black `}
                  >
                    From
                  </Text>
                </TouchableOpacity> */}
                {/*  to time  */}
                {/* <TouchableOpacity
                  onPress={showTimepicker}
                  style={tw`flex-1 flex-row justify-center items-center gap-2 border h-14 rounded-3xl border-gray-300`}
                >
                  <SvgXml xml={IconWatch} />
                  <Text
                    style={tw`font-DegularDisplayDemoMedium text-xl text-black `}
                  >
                    To
                  </Text>
                </TouchableOpacity> */}
                {/* </View> */}

                {/* {show && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    onChange={onChange}
                  />
                )} */}

                {/* ----------------------- submit password -------------- */}
                <TouchableOpacity
                  onPress={handleSubmit}
                  style={tw`px-2 py-4`}
                >
                  <View style={tw`flex-row bg-primary py-4 rounded-full justify-center gap-2 items-center`}>
                    {isLoadingMyServicePackage && <ActivityIndicator size={"small"} color={"#fff"} />}
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

export default Add_Package;

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
