import {
    IconCardProfile,
    IconDisputes,
    IconLocation,
    IconMailYellow,
    IconPhoneYellow,
    IconRightCornerArrowWhite,
    IconStar,
    IconWhiteDot
} from "@/assets/icons";
import AcceptedModal from "@/src/Components/AcceptedModal";
import UserReviewCard from "@/src/Components/UserReviewCard";
import BackTitleButton from "@/src/lib/HeaderButtons/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { useLazyOrderDetailsQuery, useOrderApproveMutation, useRequestForDeliveryMutation } from "@/src/redux/apiSlices/companyProvider/orderSlices";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, FlatList, Image, Pressable, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";

const Order_Details_Profile = () => {
    // screen state
    const [approvedModalShown, setApprovedModalShown] = useState(false)





    const { id } = useLocalSearchParams();

    const handleAssignPress = () => {
        setApprovedModalShown(false);

        setTimeout(() => {
            router.push({
                pathname: "/service_provider/company/my_employees/assign_provider",
                params: { id: id }
            })
        }, 200)
    }
    //     
    // api state
    const [fetchOrderItem, {
        data: fetchOrderData,
        isLoading: isLoadingFetchOrder,
        isFetching: isFetchingFetchOrder,
        error: isErrorFetchOrder
    }] = useLazyOrderDetailsQuery();

    const [orderApprove, {
        data: orderApproveData,
        isLoading: isLoadingOrderApprove,
        isError: isErrorOrderApprove,
        error: errorOrderApproved
    }] = useOrderApproveMutation();

    const [requestForDelivery, {
        data: requestForDeliveryData,
        isLoading: isLoadingRequestForDelivery,
        isError: isErrorRequestForDelivery,
        error: errorRequestForDelivery
    }] = useRequestForDeliveryMutation();

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
    // console.log("provider avatar image, ", order?.provider.avatar)
    // console.log("Order id: ===========", id);


    // handlers:
    const handleOrderApprove = async (orderId: any) => {
        if (!orderId) {
            return;
        }
        try {
            const response = await orderApprove(orderId).unwrap();
            console.log("======== order approve ", response);

            setApprovedModalShown(true)
        } catch (err) {
            Alert.alert("Order approve failed!");
            console.log("Order approve order failed ", err, " ", errorOrderApproved)
        }
    }
    const handleRequestForDelivery = async (orderId: any) => {
        if (!orderId) return;

        try {
            const response = await requestForDelivery(orderId).unwrap();
            router.push({
                pathname: "/Toaster",
                params: { res: response?.message || "Request for delivery send" },
            });
            setTimeout(() => {
                router.back();
            }, 2000);
        }
        catch (err) {
            router.push({
                pathname: "/Toaster",
                params: { res: "Delivery request send failed" },
            });
            console.log("Extension order error  ", err, " error ", errorRequestForDelivery)
            setTimeout(() => {
                router.back();
            }, 2000);
        }
    }

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
                            User details
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
                    <View style={tw` `}>
                        {order.booking_items?.map((bookingItem: any) => {
                            const packageItems = bookingItem.package?.package_detail_items || [];
                            return (
                                <View key={bookingItem.id} style={tw`bg-white rounded-2xl p-4 mb-4 gap-4`}>
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
                    {/* active when New order type */}
                    {order.status === "New" &&
                        <View style={tw`flex-row justify-between`}>
                            <TouchableOpacity
                                style={tw`flex-1 bg-red-500 py-4 rounded-full items-center mr-2`}
                            >
                                <Text style={tw`text-white font-DegularDisplayDemoMedium text-2xl `}>
                                    Reject
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => handleOrderApprove(order.id)}
                                style={tw`flex-1 bg-success600 py-4 rounded-full items-center ml-2`}
                            >
                                <Text style={tw`text-white font-DegularDisplayDemoMedium text-2xl`}>
                                    Approve
                                </Text>
                            </TouchableOpacity>
                        </View>

                    }


                    {/* active when Pending order type */}
                    {order.status === "Pending" &&
                        <View style={tw`gap-4`}>
                            <Text style={tw`font-DegularDisplayDemoMedium text-xl text-black`}>Assign Provider</Text>

                            <View style={tw`flex-row justify-between w-full bg-white rounded-lg py-2 px-2`}>
                                <View style={tw`flex-row gap-2 items-center `}>
                                    <View style={tw``}>
                                        <Image style={tw`w-24 h-24 rounded-lg `} source={{ uri: order?.provider?.avatar || order?.provider?.company?.company_logo }} />
                                    </View>
                                    <View>
                                        <Text style={tw`font-DegularDisplayDemoMedium text-xl`}>{order?.provider?.name}</Text>
                                        <View style={tw`flex-row gap-2 items-center`}>
                                            <Text style={tw`text-primary font-DegularDisplayDemoMedium text-xl`}>{order?.provider?.ratings_avg_rating}</Text>
                                            <SvgXml xml={IconStar} />
                                        </View>

                                    </View>
                                </View>

                                <View>
                                    <TouchableOpacity
                                        onPress={() => router.push("/service_provider/company/my_employees/employees_details")}
                                        style={tw`w-12 h-12 rounded-2xl  bg-secondary justify-center items-center `}
                                    >
                                        <SvgXml xml={IconRightCornerArrowWhite} />
                                    </TouchableOpacity>
                                </View>

                            </View>

                            <View style={tw`gap-2`}>
                                <Pressable
                                    style={tw`py-4 border border-black/20 rounded-full`}
                                    onPress={() => router.push({
                                        pathname: "/service_provider/individual/my_services/delivery_extension",
                                        params: {
                                            id: order.id
                                        }
                                    })}
                                >
                                    <Text style={tw`text-center font-DegularDisplayDemoMedium text-xl text-black`}>
                                        Extend delivery time
                                    </Text>
                                </Pressable>
                                <Pressable
                                    onPress={()=>handleRequestForDelivery(order.id)}
                                    style={tw`py-4  bg-primary rounded-full`}
                                >
                                    <Text style={tw`text-center font-DegularDisplayDemoMedium text-xl text-white`}>
                                        Request for delivery
                                    </Text>
                                </Pressable>
                                <Pressable
                                    onPress={()=> router.push({
                                        pathname: "/company/dispute_process",
                                        params: {
                                            id: order?.id
                                        }
                                    })}
                                    style={tw`py-4 `}
                                >
                                    <View style={tw`flex-row justify-center gap-2`}>
                                        <SvgXml xml={IconDisputes} />
                                        <Text style={tw`text-center font-DegularDisplayDemoMedium text-xl text-black`}>Request for dispute</Text>
                                    </View>
                                </Pressable>
                            </View>
                        </View>
                    }


                    {/* active when Completed order type */}
                    {order.status === "Completed" &&
                        <View>
                            <View style={tw`gap-4 py-2`}>
                                <Text style={tw`font-DegularDisplayDemoMedium text-xl text-black`}>Assign Provider</Text>

                                <View style={tw`flex-row justify-between w-full bg-white rounded-lg py-2 px-2`}>
                                    <View style={tw`flex-row gap-2 items-center `}>
                                        <View style={tw``}>
                                            <Image style={tw`w-24 h-24 rounded-lg `} source={{ uri: order?.provider?.avatar || order?.provider?.company?.company_logo }} />
                                        </View>
                                        <View>
                                            <Text style={tw`font-DegularDisplayDemoMedium text-xl`}>{order?.provider?.name}</Text>
                                            <View style={tw`flex-row gap-2 items-center`}>
                                                <Text style={tw`text-primary font-DegularDisplayDemoMedium text-xl`}>{order?.provider?.ratings_avg_rating}</Text>
                                                <SvgXml xml={IconStar} />
                                            </View>

                                        </View>
                                    </View>

                                    <View>
                                        <TouchableOpacity
                                            onPress={() => router.push("/service_provider/company/my_employees/employees_details")}
                                            style={tw`w-12 h-12 rounded-2xl  bg-secondary justify-center items-center `}
                                        >
                                            <SvgXml xml={IconRightCornerArrowWhite} />
                                        </TouchableOpacity>
                                    </View>

                                </View>



                            </View>

                            <View style={tw`gap-4`}>
                                <Text style={tw`font-DegularDisplayDemoMedium text-xl text-black`}>User Review</Text>
                                {
                                    order?.review && order.review.length > 0
                                        ? (
                                            <FlatList
                                                data={order.review}
                                                keyExtractor={(item) => item.id.toString()}
                                                horizontal
                                                showsHorizontalScrollIndicator={false}
                                                contentContainerStyle={tw`gap-2 `}
                                                renderItem={({ item }) => <UserReviewCard item={item} />}
                                            />
                                        ) : (
                                            <View>
                                                <Text style={tw`font-DegularDisplayDemoRegular text-base text-black`}>No reviews yet.</Text>
                                            </View>
                                        )
                                }

                            </View>
                        </View>
                    }

                    <AcceptedModal
                        visible={approvedModalShown}
                        title="Request accepted"
                        subtitle="Assign a available service provider"
                        btnText="Assign"
                        onPress={handleAssignPress}
                        onClose={() => setApprovedModalShown(false)}
                    />


                </View>
            ) : null

            }

        </ScrollView>
    );
};

export default Order_Details_Profile;
