export default function Card() {
    return (
        <>
            <div className="card card-bordered bg-base-100 shadow-xl">
                <div className="card-body">


                    <h2 className="card-title">Card Title</h2>
                    <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary">Buy Now</button>
                    </div>

                </div>

            </div>
        </>
    );
}