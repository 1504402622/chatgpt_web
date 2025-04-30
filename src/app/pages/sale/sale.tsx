import styles from './sale.module.scss';
import QRCode from 'qrcode.react';
import { createPayOrder, queryProductList } from "@/apis";
import { useEffect, useState } from "react";
import { SaleProduct, SaleProductEnum } from "@/types/sale_product";
import { useAccessStore } from "@/app/store/access";
import { useNavigate } from "react-router-dom";

export function Sale() {
    const [products, setProducts] = useState<SaleProduct[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [payUrl, setPayUrl] = useState('');

    const navigate = useNavigate();

    const handleButtonClick = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const queryProductListHandle = async () => {
        const res = await queryProductList();
        const { data, code } = await res.json();
        if (code === SaleProductEnum.NeedLogin) {
            useAccessStore.getState().goToLogin();
        }
        setProducts(data);
    };

    const payOrder = async (productId: number) => {
        const res = await createPayOrder(productId);
        const { data, code } = await res.json();
        if (code === SaleProductEnum.NeedLogin) {
            useAccessStore.getState().goToLogin();
        }
        if (code === SaleProductEnum.SUCCESS) {
            setPayUrl(data);
            handleButtonClick();
        }
    };

    useEffect(() => {
        queryProductListHandle().then(() => { });
    }, []);

    return (
        <div className={styles["sale"]}>
            {products?.map((product) => (
                <div key={product.productId} className={styles["product"]}>
                    <div className={styles["product-info"]}>
                        <div className={styles["product-name"]}>
                            {product.productName}
                        </div>
                        <div className={styles["product-token"]}>
                            {product.quota}
                            <span className={styles["product-token-subscript"]}>(条)</span>
                        </div>
                        <div className={styles["product-desc"]}>
                            <span>{product.productDesc}</span>
                        </div>
                    </div>
                    <div className={styles["product-price-buy"]}>
                        <div className={styles["product-price"]}>
                            <span style={{ color: '#ff6b6b', fontSize: "20px" }}>
                                ￥{product.price.toFixed(2)}
                            </span>
                        </div>
                        <div className={styles["product-buy"]} onClick={() => payOrder(product.productId)}>
                            立即购买
                        </div>
                    </div>
                </div>
            ))}

            {showModal && (
                <div className={styles["product-pay"]}>
                    <div className={styles["product-pay-url"]}>
                        <img src={payUrl} />
                    </div>
                    <div className={styles["product-pay-close"]}>
                        <div onClick={handleCloseModal}> 支付完成，点击关闭.</div>
                    </div>

                </div>
            )}
        </div>
    );
}