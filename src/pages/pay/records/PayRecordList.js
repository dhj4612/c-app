import { FlatList } from "react-native";
import { useEffect, useRef, useState } from "react";
import { fetchPayRecordsApi } from "../../../api";
import Loading from "../../../components/Loading";
import { handlerErr } from "../../../utils/request_error_handler";
import { xTd } from "../../../utils/tools";
import RenderRecordItem from "./RenderRecordItem";
import RevokeModal from "./RevokeModal";
import GoPayModal from "./GoPayModal";
import EmptyData from "../../../components/EmptyData";
import BankCardConfirmPayModal from "./BankCardConfirmPayModal";

export default (props) => {
  const { state } = props;
  const [list, setList] = useState([]);
  const revokeModalRef = useRef(null);
  const goPayModalRef = useRef(null);
  const confirmPayModalRef = useRef(null);

  const refreshData = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await fetchPayRecordsApi({ state });
        setList(result);
        resolve();
      } catch (e) {
        reject(e);
      }
    });
  };
  const initData = async () => {
    Loading.show();
    try {
      await refreshData();
    } catch (e) {
      await handlerErr(e);
    } finally {
      Loading.hide();
    }
  };
  useEffect(() => {
    initData().then();
  }, [state]);

  return <>
    <RevokeModal refresh={refreshData} ref={revokeModalRef} />
    <GoPayModal refresh={refreshData} ref={goPayModalRef} />
    <BankCardConfirmPayModal refresh={refreshData} ref={confirmPayModalRef} />
    <FlatList data={list}
              contentContainerStyle={{
                padding: xTd(10),
              }}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={<EmptyData />}
              renderItem={({ item, index }) =>
                <RenderRecordItem item={item}
                                  index={index}
                                  key={item.recordId}
                                  revokeModalRef={revokeModalRef}
                                  goPayModalRef={goPayModalRef}
                                  confirmPayModalRef={confirmPayModalRef}
                                  refresh={refreshData} />}
    />
  </>;
}
