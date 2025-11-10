import {
    IconCardProfile,
    IconLocation,
    IconMailYellow,
    IconPhoneYellow,
    IconWhiteDot
} from "@/assets/icons";
import BackTitleButton from "@/src/lib/HeaderButtons/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { useLazyOrderDetailsQuery } from "@/src/redux/apiSlices/companyProvider/orderSlices";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect } from "react";
import { ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";

const Order_Details_Profile = () => {
    // screen state

    const { id } = useLocalSearchParams();


    // api state
    const [fetchOrderItem, {
        data: fetchOrderData,
        isLoading: isLoadingFetchOrder,
        isFetching: isFetchingFetchOrder,
        error: isErrorFetchOrder
    }] = useLazyOrderDetailsQuery();


    // api function
    const formatDate = (dateStr: string) => {
        console.log("Date =========", dateStr);
        const date = new Date(dateStr);

        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is 0-indexed
        const year = date.getFullYear();

        return `${day}-${month}-${year}`;
    };



    // api effect
    useEffect(() => {
        if (!id) return;
        const fetchData = async () => {
            try {
                await fetchOrderItem(id).unwrap();
            } catch (err) {
                console.error("Failed to fetch order details:", err);
            }

        }
        fetchData();
    }, [id])

    // useEffect(() => {
    //     console.log("Item details ============ ", JSON.stringify(fetchOrderData?.data, null, 2))
    // }, [fetchOrderData?.data])
    const order = fetchOrderData?.data;
    console.log("Order id: ===========", JSON.stringify(order, null, 2));
    return (
        <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            keyboardDismissMode="interactive"
            style={tw`flex-1 bg-base_color px-5 `}
            contentContainerStyle={tw`pb-6`}
        >
            {/* btn header */}

            <BackTitleButton
                pageName="Order Details"
                onPress={() => router.back()}
                titleTextStyle={tw`text-xl`}
            />
            {isLoadingFetchOrder || isFetchingFetchOrder ? (
                <View>
                    <ActivityIndicator size={"small"} color="#ff6600" />

                </View>
            ) : order ? (
                <View>
                    <View style={tw`flex-row justify-center items-center my-4`


                    }>
                        <View
                            style={tw`flex-row py-2 px-7 justify-between items-center gap-2 rounded-full ${order.status === "New" ? "bg-primary" : order.status === "Pending" ? "bg-violet" : "bg-success600"}`}
                        >
                            <SvgXml xml={IconWhiteDot} />
                            <Text style={tw`font-DegularDisplayDemoMedium text-xl pb-1 text-white`}>{order.status === "New" ? "New Order" : order.status || "updated"}</Text>
                        </View>

                    </View>


                    <View
                        style={tw`bg-white h-56 rounded-xl justify-center items-center gap-2`}
                    >
                        <Image style={tw`w-24 h-24 rounded-full `} source={{ uri: order.user?.avatar }} />
                        <View style={tw`flex-row items-center gap-2`}>
                            <Text style={tw`font-DegularDisplayDemoRegular text-2xl text-black`}>{order.user?.name || "Unknown"}</Text>
                            {/* <SvgXml xml={IconProfileBadge} /> */}

                        </View>
                        <View
                            style={tw`flex-row py-2 px-7 justify-between items-center gap-2 rounded-full ${order.user?.kyc_status === "In Review" ? "bg-secondary" : order.status === "Verified" ? "bg-violet" : "bg-blueMagenta"}`}
                        >
                            <Text style={tw`font-PoppinsMedium text-base text-white`}>{order.user.kyc_status}</Text>
                        </View>
                    </View>

                    {/* ------------------- user datails --------------- */}
                    <View style={tw`bg-white rounded-2xl p-5 mb-4 shadow-sm gap-3 my-4`}>
                        <Text style={tw`font-DegularDisplayDemoMedium text-2xl text-black`}>
                            Booking details
                        </Text>

                        <View style={tw`flex-row gap-3 items-center`}>
                            <SvgXml xml={IconCardProfile} />
                            <Text style={tw`font-DegularDisplayDemoRegular text-xl text-black`}>
                                {order?.user?.name || "Unknown"}
                            </Text>
                        </View>

                        <View style={tw`flex-row gap-3 items-center`}>
                            <SvgXml xml={IconMailYellow} />
                            <Text style={tw`font-DegularDisplayDemoRegular text-xl text-black`}>
                                {order?.user?.email}
                            </Text>
                        </View>
                        {/* TODO ask is phone number fetch from billing is right*/}
                        <View style={tw`flex-row gap-3 items-center`}>
                            <SvgXml xml={IconPhoneYellow} />
                            <Text style={tw`font-DegularDisplayDemoRegular text-xl text-black`}>
                                {order?.user?.phone ? order.user.phone : order.billing.phone}
                            </Text>
                        </View>

                        <View style={tw`flex-row gap-3 items-center`}>
                            <SvgXml xml={IconLocation} />
                            <Text style={tw`font-DegularDisplayDemoRegular text-xl text-black`}>
                                {order?.user?.address ? order.user.address : "N/A"}
                            </Text>
                        </View>
                    </View>

                    {/*  --------------------- Booking Details */}
                    <View style={tw`bg-white rounded-2xl p-5 mb-4 shadow-sm gap-2 my-4`}>
                        <Text style={tw`font-DegularDisplayDemoMedium text-2xl text-black`}>
                            Booking details
                        </Text>
                        <View style={tw`flex-row justify-between items-center `}>
                            <Text style={tw`font-DegularDisplayDemoMedium text-xl text-black`}>
                                Date:
                            </Text>
                            <Text style={tw`font-DegularDisplayDemoLight text-xl text-black`}>
                                {formatDate(order?.booking_items?.[0]?.created_at || "N/A")}
                            </Text>
                        </View>

                        <View style={tw`flex-row justify-between items-center `}>
                            <Text style={tw`font-DegularDisplayDemoMedium text-xl text-black`}>
                                Booking Type:
                            </Text>
                            <Text style={tw`font-DegularDisplayDemoLight text-xl text-black capitalize`}>
                                {order.booking_type + " " || "N/A"}
                            </Text>
                        </View>
                        <View style={tw`flex-row justify-between items-center `}>
                            <Text style={tw`font-DegularDisplayDemoMedium text-xl text-black`}>
                                Time selection:
                            </Text>
                            <Text style={tw`font-DegularDisplayDemoLight text-xl text-black capitalize`}>
                                {order.booking_process || "N/A"}
                            </Text>
                        </View>
                        {order.booking_process === "instant" ? <View style={tw`flex-row justify-between items-center `}>
                            <Text style={tw`font-DegularDisplayDemoMedium text-xl text-black`}>
                                Time slot:
                            </Text>
                            <Text style={tw`font-DegularDisplayDemoLight text-xl text-black`}>
                                N/A
                            </Text>
                        </View> :
                            <View style={tw`flex-row justify-between items-center `}>
                                <Text style={tw`font-DegularDisplayDemoMedium text-xl text-black`}>
                                    Time slot:
                                </Text>
                                <Text style={tw`font-DegularDisplayDemoLight text-xl text-black`}>
                                    02:00 PM - 04:00 PM
                                </Text>
                            </View>
                        }

                    </View>

                    {/*======================== Service Details ============ */}
                    <View style={tw`bg-white rounded-2xl p-4 mb-4 shadow-sm`}>
                        {order.booking_items?.map((bookingItem: any) => {
                            const packageItems = bookingItem.package?.package_detail_items || [];
                            return (
                                <View key={bookingItem.id} style={tw`bg-white rounded-2xl p-4 mb-4 shadow-sm`}>
                                    <Text style={tw`font-bold text-lg mb-2`}>
                                        {bookingItem.package?.title || "Service title goes here."}
                                    </Text>

                                    {/* Map package_detail_items */}
                                    <View style={tw`ml-2 gap-2`}>
                                        {packageItems.map((item: any) => (
                                            <Text
                                                key={item.id}
                                                style={tw`font-DegularDisplayDemoRegular text-xl text-black`}
                                            >
                                                • {item.item}
                                            </Text>
                                        ))}
                                    </View>

                                    {/* Cost Section */}
                                    <View
                                        style={tw`bg-primary w-full h-14 rounded-full flex-row justify-between items-center px-4 my-2`}
                                    >
                                        <Text style={tw`text-white font-DegularDisplayDemoMedium text-3xl`}>
                                            Cost:{" "}
                                        </Text>
                                        <Text style={tw`text-white font-DegularDisplayDemoMedium text-3xl`}>
                                            ₦ {bookingItem.package?.price || "0.00"}
                                        </Text>
                                    </View>
                                </View>
                            );
                        })}


                        {/* Cost Section
                        <View
                            style={tw`bg-primary w-full h-14 rounded-full flex-row justify-between items-center px-4 my-2`}
                        >
                            <Text style={tw`text-white font-DegularDisplayDemoMedium text-3xl`}>
                                Cost:{" "}
                            </Text>
                            <Text style={tw`text-white font-DegularDisplayDemoMedium text-3xl`}>
                                {" "}
                                ₦ 49.00
                            </Text>
                        </View> */}
                    </View>

                    {/* Action Buttons */}
                    <View style={tw`flex-row justify-between`}>
                        <TouchableOpacity
                            style={tw`flex-1 bg-red-500 py-4 rounded-full items-center mr-2`}
                        >
                            <Text style={tw`text-white font-DegularDisplayDemoMedium text-2xl `}>
                                Reject
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={tw`flex-1 bg-success600 py-4 rounded-full items-center ml-2`}
                        >
                            <Text style={tw`text-white font-DegularDisplayDemoMedium text-2xl`}>
                                Approve
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ) : null

            }

        </ScrollView>
    );
};

export default Order_Details_Profile;
