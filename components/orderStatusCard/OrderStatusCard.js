import "./style.css"

const OrderStatusCard = (props) => {

    const {
        status
    } = props

    // console.log(status === "confirmd" || status === "placed" ? "active" : "");

    return (
        <div>
            <h2>All your ongoing orders </h2>
            <div className=" flex p-2">
                <ul className=" grid justify-center gap-1">
                    <div className="circle ">
                        <div className={`sub-circle  ${status === "Order Placed" || status === "confirmed" || status === "completed" ? "active" : ""}`}>
                            <p>Order Placed</p>
                        </div>
                    </div>
                    <div className={`bar  ${status === "confirmed" || status === "completed" ? "active" : ""}`}></div>
                    <div className="circle ">
                        <div className={`sub-circle  ${status === "confirmed" || status === "completed" ? "active" : ""}`}>
                            <p>Confirmed</p>
                        </div>
                    </div>
                    <div className={`bar ${status === "completed" ? "active" : ""} `}></div>
                    <div className="circle ">
                        <div className={`sub-circle  ${status === "completed" ? "active" : ""}`}>
                            <p>Order Completed</p>
                        </div>
                    </div>
                </ul>
            </div>
        </div>
    )
}

export default OrderStatusCard