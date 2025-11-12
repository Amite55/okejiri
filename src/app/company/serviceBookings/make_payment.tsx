import { IconBalance } from "@/assets/icons";
import { ImgLoadingSuccess } from "@/assets/images/image";
import PrimaryButton from "@/src/Components/PrimaryButton";
import BackTitleButton from "@/src/lib/HeaderButtons/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { useProfileQuery } from "@/src/redux/apiSlices/authSlices";
import { useCreatePaymentIntentMutation } from "@/src/redux/apiSlices/stripeSlices";
import { useBookingSuccessMutation } from "@/src/redux/apiSlices/userProvider/bookingsSlices";
import { useStripe } from "@stripe/stripe-react-native";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SvgXml } from "react-native-svg";

const Make_Payment = () => {
  const { bookingInfoDetails } = useLocalSearchParams();
  const [isMakePayment, setIsMakePayment] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const perseBookingInfoDetails = JSON.parse(bookingInfoDetails as any);
  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  // ----------- api end point ----------
  const { data: getProfileData } = useProfileQuery({});
  const [bookingItem, { isLoading, error }] = useBookingSuccessMutation();
  const [createPaymentIntent] = useCreatePaymentIntentMutation();

  // convert to number -------------
  const walletBalance = Number(getProfileData?.data?.wallet_balance ?? 0);
  const bookingPrice = Number(perseBookingInfoDetails?.price ?? 0);

  const handelPayment = async () => {
    try {
      const bookingInfo = {
        provider_id: perseBookingInfoDetails?.provider_id,
        booking_process:
          perseBookingInfoDetails?.booking_process === "Instant booking"
            ? "instant"
            : "schedule",
        booking_type:
          perseBookingInfoDetails?.booking_type === "Single"
            ? "single"
            : "group",
        price: perseBookingInfoDetails?.price,
        name: perseBookingInfoDetails?.billing_name,
        email: perseBookingInfoDetails?.billing_email,
        phone: perseBookingInfoDetails?.billing_contact,
        address: perseBookingInfoDetails?.billing_address,

        payment_type: isMakePayment ? "make_payment" : "from_balance",
        ...(perseBookingInfoDetails?.booking_type === "Group" && {
          number_of_people: perseBookingInfoDetails?.number_of_people,
        }),
        ...(perseBookingInfoDetails?.booking_process === "Schedule booking" && {
          schedule_date: perseBookingInfoDetails?.schedule_date,
          schedule_time_slot: perseBookingInfoDetails?.schedule_time_slot,
        }),
      };
      // ------------- if you payment to your wallet ------------------------
      if (isMakePayment) {
        const intentInfo = {
          amount: perseBookingInfoDetails?.price,
          currency: "NGN",
        };
        const res = await createPaymentIntent(intentInfo).unwrap();
        const clientSecret = res?.data?.client_secret;
        const paymentIntentId = res?.data?.id;
        // if you hav't client secret -0------------------
        if (!clientSecret) {
          router.push({
            pathname: "/Toaster",
            params: {
              res: "Could not initialize payment sheet. Please try again.",
            },
          });
          setIsMakePayment(false);
          return;
        }
        // 1️⃣ Stripe sheet initialize with client secret
        const { error: intError } = await initPaymentSheet({
          paymentIntentClientSecret: clientSecret,
          merchantDisplayName: "Okejiri Services",
        });
        // if when show error
        if (intError) {
          // handle error
          router.push({
            pathname: "/Toaster",
            params: { res: intError?.message || intError },
          });
          setIsMakePayment(false);
          return;
        } else {
          const { error } = await presentPaymentSheet();
          if (
            error?.code === "Canceled" ||
            error?.code === "CanceledError" ||
            error
          ) {
            router.push({
              pathname: "/Toaster",
              params: { res: error?.message || error },
            });
            setIsMakePayment(false);
          } else {
            // ==================== stripe payment  ====================
            const makePaymentInfo = {
              ...bookingInfo,
              payment_intent_id: paymentIntentId,
            };
            const res = await bookingItem(makePaymentInfo).unwrap();
            // ==================== stripe payment success ====================
            if (res) {
              setModalVisible(true);
              setTimeout(() => {
                setModalVisible(false);
                router.push("/company/(Tabs)");
              }, 1500);
            }
          }
        }

        // ================== if you payment to your wallet ====================-
      } else if (!isMakePayment) {
        const res = await bookingItem(bookingInfo).unwrap();
        if (res) {
          setModalVisible(true);
          setTimeout(() => {
            setModalVisible(false);
            router.push("/company/(Tabs)");
          }, 1500);
        }
      }
    } catch (error) {
      console.log(error, "Payment not successful");
      router.push({
        pathname: `/Toaster`,
        params: { res: error?.message || error },
      });
      setIsMakePayment(false);
    }
  };

  // --------------- if make payment is true call this hook ---------------------
  useEffect(() => {
    let didRun = false;
    if (isMakePayment && !didRun) {
      handelPayment();
      didRun = true;
    }
    return () => {
      didRun = true;
      // isMakePayment(false);
    };
  }, [isMakePayment]);

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      style={tw`flex-1 px-5 bg-base_color `}
      contentContainerStyle={tw`pb-1 justify-between flex-grow`}
    >
      <View>
        <BackTitleButton
          pageName={"Payment"}
          onPress={() => router.back()}
          titleTextStyle={tw`text-xl`}
        />
        {/* ----------------- hare is make payment and not make payment ------------- */}
        <View
          style={[
            tw`border border-slate-300 rounded-full h-12 flex-row justify-between items-center my-7`,
          ]}
        >
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setIsMakePayment(false)}
            style={[
              tw`w-44 h-full rounded-full justify-center items-center`,
              !isMakePayment ? tw`bg-primary` : tw`bg-transparent`,
            ]}
          >
            <Text
              style={[
                tw`font-DegularDisplayDemoRegular text-base`,
                !isMakePayment ? tw`text-white` : tw`text-regularText`,
              ]}
            >
              Use from balance
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              setIsMakePayment(true);
            }}
            style={[
              tw`w-44 h-full rounded-full justify-center items-center`,
              isMakePayment ? tw`bg-primary` : tw`bg-transparent`,
            ]}
          >
            <Text
              style={[
                tw`font-DegularDisplayDemoRegular text-base`,
                isMakePayment ? tw`text-white` : tw`text-regularText`,
              ]}
            >
              Make payment
            </Text>
          </TouchableOpacity>
        </View>

        {/* ----------------------- Use from balance -0----------------- */}

        {!isMakePayment && (
          <View style={tw`gap-3`}>
            <View
              style={tw`bg-white h-40 rounded-3xl flex-row justify-between items-center px-6`}
            >
              <View style={tw`gap-2`}>
                <Text
                  style={tw`font-DegularDisplayDemoRegular text-xl text-black`}
                >
                  Available balance
                </Text>
                <Text
                  style={tw`font-DegularDisplayDemoMedium text-3xl text-black`}
                >
                  ₦ {walletBalance.toFixed(2)}
                </Text>
              </View>

              <View
                style={tw`border border-primary w-24 h-24 rounded-full justify-center items-center`}
              >
                <SvgXml xml={IconBalance} />
              </View>
            </View>

            {/* --------------------- Cost -=----------------- */}

            <View
              style={tw`bg-white h-14 rounded-2xl flex-row justify-between items-center px-5`}
            >
              <Text
                style={tw`font-DegularDisplayDemoRegular text-xl text-black`}
              >
                Cost
              </Text>
              <Text
                style={tw`font-DegularDisplayDemoMedium text-xl text-primary`}
              >
                ₦{bookingPrice.toFixed(2)}
              </Text>
            </View>

            {/* -------------------Remaining balance will be: ---------------------- */}
            <View
              style={tw`bg-white h-14 rounded-2xl flex-row justify-between items-center px-5`}
            >
              <Text
                style={tw`font-DegularDisplayDemoRegular text-xl text-black`}
              >
                Remaining balance will be:
              </Text>
              <Text
                style={tw`font-DegularDisplayDemoMedium text-xl text-primary`}
              >
                ₦
                {walletBalance > 0
                  ? (walletBalance - bookingPrice).toFixed(2)
                  : walletBalance.toFixed(2)}
              </Text>
            </View>
          </View>
        )}

        {/* ------------------- Make payment -------------------------- */}
        {isMakePayment && (
          <View style={tw` pt-3 justify-center items-center `}>
            <Text style={tw`text-black font-DegularDisplayDemoBold text-2xl`}>
              Payment procedure
            </Text>
          </View>
        )}
      </View>

      {/*  ------------- next button -------------------- */}
      {!isMakePayment ? (
        walletBalance > bookingPrice ? (
          isLoading ? (
            <ActivityIndicator size="large" color="primary" />
          ) : (
            <PrimaryButton
              onPress={() => {
                handelPayment();
              }}
              titleProps="Place Order"
              contentStyle={tw`mt-4`}
            />
          )
        ) : (
          <PrimaryButton
            onPress={() =>
              router.push({
                pathname: "/Toaster",
                params: { res: "Insufficient balance" },
              })
            }
            titleProps="Next"
            contentStyle={tw`mt-4 bg-slate-500`}
          />
        )
      ) : null}

      {/*  ========================== successful modal ======================= */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View
          style={tw` flex-1 bg-black bg-opacity-50 justify-center items-center`}
        >
          <View
            style={tw`w-8/9 bg-white p-5 rounded-2xl items-center shadow-lg`}
          >
            {/* Check Icon */}
            <Image style={tw`mt-6 mb-2`} source={ImgLoadingSuccess} />

            {/* Success Message */}
            <Text
              style={tw`text-xl bg-secondary px-2 py-1 rounded-xl font-PoppinsRegular mt-3`}
            >
              In Review
            </Text>
            <Text style={tw`text-base text-gray-500 text-center mt-2`}>
              Your order has been placed.
            </Text>

            {/* Close Button */}
            {/* <PrimaryButton
              onPress={() => {
                setModalVisible(false);
                router.push("/company/(Tabs)");
              }}
              titleProps="Go to home"
              IconProps={IconRightArrow}
              contentStyle={tw`mt-4`}
            /> */}
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default Make_Payment;
