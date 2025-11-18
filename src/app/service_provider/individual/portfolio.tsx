import BackTitleButton from "@/src/lib/HeaderButtons/BackTitleButton";
import tw from "@/src/lib/tailwind";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Modal,
  Pressable,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import {
  IconCross,
  IconDeleteRed,
  IconPlus,
  IconSwapGreen,
  IconThreeWhite,
} from "@/assets/icons";
import PrimaryButton from "@/src/Components/PrimaryButton";
import {
  useAddPortfolioMutation,
  useDeletePortfoliosMutation,
  useLazyGetPortfoliosQuery,
  useUpdatePortfolioMutation,
} from "@/src/redux/apiSlices/companyProvider/account/portfolioSlice";
import * as ImagePicker from "expo-image-picker";
import { SvgXml } from "react-native-svg";

const Portfolio = () => {
  const [selectModalVisible, setSelectModalVisible] = React.useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  // pagination & list states
  const [page, setPage] = useState<number>(1);
  const [portfolios, setPortfolios] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isFirstLoading, setIsFirstLoading] = useState<boolean>(true);

  const [imageAsset, setImageAsset] =
    React.useState<ImagePicker.ImagePickerAsset | null>(null);
  const [fetchPortfolios, { isLoading, isFetching }] =
    useLazyGetPortfoliosQuery();
  const [deletePortfolios] = useDeletePortfoliosMutation();
  const [updatePortfolio] = useUpdatePortfolioMutation();
  const [addPortfolio] = useAddPortfolioMutation();

  // === Load data from API with pagination ===
  const loadPortfolios = async (pageNum = 1, isRefresh = false) => {
    try {
      if ((isLoading || isFetching || loadingMore) && !isRefresh) return;

      if (isRefresh) {
        setRefreshing(true);
        setIsFirstLoading(pageNum === 1);
      } else {
        setLoadingMore(true);
      }

      const res = await fetchPortfolios(pageNum).unwrap();
      const responseData = res?.data || {};
      const newData = responseData?.data || [];
      const currentPage = responseData?.current_page || pageNum;
      const lastPage = responseData?.last_page;
      if (isRefresh) {
        setPortfolios(newData);
      } else {
        setPortfolios((prev) => {
          const existingIds = new Set(prev.map((p) => p.id));
          const uniqueNew = newData.filter((p: any) => !existingIds.has(p.id));
          const result = [...prev, ...uniqueNew];
          return result;
        });
      }

      if (lastPage) {
        setHasMore(currentPage < lastPage);
      } else {
        setHasMore(newData.length > 0);
      }
      setPage(currentPage + 1);
    } catch (err) {
      console.log(" Portfolio fetch error:", err);
      setHasMore(false);
    } finally {
      setRefreshing(false);
      setLoadingMore(false);
      setIsFirstLoading(false);
    }
  };

  // === Refresh ===
  const handleRefresh = () => {
    setPage(1);
    setHasMore(true);
    loadPortfolios(1, true);
  };

  // === Load More ===
  const handleLoadMore = () => {
    if (!loadingMore && hasMore && !isFetching && !isLoading && page > 1) {
      loadPortfolios(page);
    }
  };

  useEffect(() => {
    loadPortfolios(1, true);
  }, []);

  // === select item modal open ===
  const hendelAction = (id: number) => {
    setSelectedId(id);
    setSelectModalVisible(true);
  };

  // === pick new image (update portfolio) ===
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0 && selectedId) {
      const selectedImage = result.assets[0];
      setImageAsset(selectedImage);

      const form = new FormData();
      const filename =
        selectedImage.fileName ??
        selectedImage.uri.split("/").pop() ??
        `image_${Date.now()}.jpg`;

      const extMatch = /\.(\w+)$/.exec(filename);
      const mime = extMatch ? `image/${extMatch[1]}` : "image/jpeg";

      form.append("_method", "PUT");
      form.append("image", {
        uri: selectedImage.uri,
        name: filename,
        type: mime,
      } as any);

      try {
        const res = await updatePortfolio({
          id: selectedId,
          requestBody: form,
        }).unwrap();

        if (res?.status === "success") {
          setSelectModalVisible(false);
          handleRefresh();
        }
      } catch (err) {
        console.log("Update error:", err);
      }
    } else {
      console.log(" Image selection cancelled");
    }
  };

  // === add new image ===
  const pickImageAddMore = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      const selectedImage = result.assets[0];
      setImageAsset(selectedImage);

      const form = new FormData();
      const filename =
        selectedImage.fileName ??
        selectedImage.uri.split("/").pop() ??
        `image_${Date.now()}.jpg`;

      const extMatch = /\.(\w+)$/.exec(filename);
      const mime = extMatch ? `image/${extMatch[1]}` : "image/jpeg";

      form.append("image", {
        uri: selectedImage.uri,
        name: filename,
        type: mime,
      } as any);

      try {
        const res = await addPortfolio(form).unwrap();

        if (res?.status === "success") {
          router.push({
            pathname: "/Toaster",
            params: { res: res.message },
          });
          handleRefresh();
        }
      } catch (err) {
        console.log("Add error:", err);
      }
    } else {
      console.log(" Image selection cancelled pickImageAddMore");
    }
  };

  // === delete portfolio item ===
  const handleDelete = async () => {
    if (!selectedId) return;

    try {
      const res = await deletePortfolios(selectedId).unwrap();
      router.push({
        pathname: "/Toaster",
        params: { res: res.message },
      });
      setSelectModalVisible(false);
      handleRefresh();
    } catch (err) {
      console.log(" Delete error:", err);
    }
  };

  // === Initial full-screen loader ===
  if (isFirstLoading && portfolios.length === 0 && !refreshing) {
    return (
      <View style={tw`flex-1 bg-base_color justify-center items-center`}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={tw`flex-1 bg-base_color px-3 pb-2`}>
      <FlatList
        data={portfolios}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={
          <BackTitleButton
            pageName="Portfolio"
            onPress={() => router.back()}
            titleTextStyle={tw`text-xl `}
          />
        }
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw`gap-3 pb-4`}
        style={tw`pt-2`}
        columnWrapperStyle={tw`justify-between`}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
        renderItem={({ item }: any) => (
          <View style={[tw`w-[48%] mb-3`, { height: 240 }]}>
            <Image
              source={{ uri: item.image }}
              resizeMode="cover"
              style={[tw`w-full rounded-2xl`, { height: 240 }]}
            />
            <TouchableOpacity
              onPress={() => hendelAction(item.id)}
              style={tw`absolute top-3 right-3 justify-center items-center w-10 h-10 rounded-full border border-white bg-black bg-opacity-30`}
            >
              <SvgXml xml={IconThreeWhite} />
            </TouchableOpacity>
          </View>
        )}
        ListFooterComponent={
          loadingMore ? (
            <View style={tw`py-4 flex justify-center items-center`}>
              <ActivityIndicator size="small" />
              <Text style={tw`mt-2 text-gray-500`}>
                Loading more portfolios...
              </Text>
            </View>
          ) : !hasMore && portfolios.length > 0 ? (
            <View style={tw`py-4 flex justify-center items-center`}>
              <Text style={tw`text-gray-500 mb-4`}>No more portfolios</Text>
            </View>
          ) : null
        }
        ListEmptyComponent={
          !isFirstLoading && !refreshing ? (
            <View style={tw`py-10 flex justify-center items-center`}>
              <Text style={tw`text-gray-500 mb-32`}>No portfolio found</Text>
              <PrimaryButton
                titleProps="Add Portfolio"
                IconProps={IconPlus}
                contentStyle={tw`mt-4`}
                onPress={pickImageAddMore}
              />
            </View>
          ) : null
        }
      />

      {/* Add More Button - Always visible at bottom */}
      {!isFirstLoading && !refreshing && portfolios.length > 0 && (
        <View style={tw`absolute bottom-4 left-0 right-0 px-3`}>
          <PrimaryButton
            titleProps="Add More"
            IconProps={IconPlus}
            onPress={pickImageAddMore}
          />
        </View>
      )}

      {/* ========= selected modal ============= */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={selectModalVisible}
        onRequestClose={() => setSelectModalVisible(false)}
      >
        <View
          style={tw`flex-1 bg-black bg-opacity-50 justify-center items-center`}
        >
          <View
            style={tw`w-7/8 bg-white p-5 rounded-2xl items-center shadow-lg`}
          >
            <View style={tw`w-full flex-row justify-between items-center`}>
              <Text style={tw`text-2xl font-bold mt-3`}>Select one</Text>
              <Pressable
                style={tw`p-3`}
                onPress={() => setSelectModalVisible(false)}
              >
                <SvgXml xml={IconCross} />
              </Pressable>
            </View>

            <View style={tw`w-full m-4`}>
              <TouchableOpacity
                style={tw`flex-row justify-center items-center border border-[#0063E580] w-full p-3 rounded-lg gap-2 mb-3`}
                onPress={pickImage}
              >
                <SvgXml xml={IconSwapGreen} />
                <Text style={tw`text-base`}>Swap image</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={tw`flex-row justify-center items-center border border-[#C47575] w-full p-3 rounded-lg gap-2`}
                onPress={handleDelete}
              >
                <SvgXml xml={IconDeleteRed} />
                <Text style={tw`text-base`}>Delete image</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Portfolio;
