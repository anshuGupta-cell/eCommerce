import "./style.css"

const OrderStatusCard = (props) => {

    const {
        status
    } = props

    // console.log(status === "confirmd" || status === "placed" ? "active" : "");

    return (
        <div>
            <h2>All your ongoing orders </h2>
            <div class=" flex p-2">
                <ul class=" grid justify-center gap-1">
                    <div class="circle ">
                        <div class={`sub-circle  ${status === "placed" || status === "confirmed" || status === "completed" ? "active" : ""}`}>
                            <p>Order Placed</p>
                        </div>
                    </div>
                    <div class={`bar  ${status === "confirmed" || status === "completed" ? "active" : ""}`}></div>
                    <div class="circle ">
                        <div class={`sub-circle  ${status === "confirmed" || status === "completed" ? "active" : ""}`}>
                            <p>Confirmed</p>
                        </div>
                    </div>
                    <div class={`bar ${status === "completed" ? "active" : ""} `}></div>
                    <div class="circle ">
                        <div class={`sub-circle  ${status === "completed" ? "active" : ""}`}>
                            <p>Order Completed</p>
                        </div>
                    </div>
                </ul>
            </div>
        </div>
    )
}

export default OrderStatusCard