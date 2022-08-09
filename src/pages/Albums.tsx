import React from "react";
import { Link } from "react-router-dom";

import { Modal, NewAlbumForm } from "../components";
import { useModal } from "../hooks/useModal";

const Albums: React.FC = () => {
	const modalRef = React.createRef<HTMLDivElement>();
	const openBtnRef = React.useRef<HTMLButtonElement>(null);

	const { isActive, openModal, closeModal } = useModal(modalRef, openBtnRef);

	return (
		<>
			<Modal ref={modalRef} active={isActive} closeModal={closeModal} title="Add new album">
				<NewAlbumForm />
			</Modal>
			<section className="albums" aria-labelledby="albumsSectionTitle">
				<h1 className="albums__title" id="albumsSectionTitle">
					Albums Catalog
				</h1>
				<div className="albums__grid">
					<article className="albums__article">
						<button
							ref={openBtnRef}
							type="button"
							className="albums__new"
							onClick={openModal}
							aria-label="Add new album"
						>
							+
						</button>
						<div className="albums__controls">
							<p className="albums__name">Add new album</p>
						</div>
						<p className="albums__location">Site</p>
					</article>
					<article className="albums__article">
						<div className="albums__wrapper">
							<img
								className="albums__img"
								src="https://images.unsplash.com/photo-1659613550771-7175d4fdbb8a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDJ8NnNNVmpUTFNrZVF8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=60"
								alt=""
							/>
						</div>
						<div className="albums__controls">
							<Link className="albums__link" to="/album/1">
								Name
							</Link>
							<button className="albums__setting" type="button" aria-label="Photo settings" title="Photo settings">
								<svg
									focusable="false"
									aria-hidden="true"
									fill="none"
									width="16"
									height="16"
									stroke="#000000"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<use xlinkHref="#settings" />
								</svg>
							</button>
						</div>
						<p className="albums__location">Locaton</p>
					</article>
					<article className="albums__article">
						<div className="albums__wrapper">
							<img
								className="albums__img"
								src="https://images.unsplash.com/photo-1659574087501-92ef4aa7b2d8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDN8NnNNVmpUTFNrZVF8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=60"
								alt=""
							/>
						</div>
						<div className="albums__controls">
							<Link className="albums__link" to="/album/1">
								Name
							</Link>
							<button className="albums__setting" type="button" aria-label="Photo settings" title="Photo settings">
								<svg
									focusable="false"
									aria-hidden="true"
									fill="none"
									width="16"
									height="16"
									stroke="#000000"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<use xlinkHref="#settings" />
								</svg>
							</button>
						</div>
						<p className="albums__location">Locaton</p>
					</article>
					<article className="albums__article">
						<div className="albums__wrapper">
							<img
								className="albums__img"
								src="https://images.unsplash.com/photo-1659204994421-defa6dca745c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDZ8NnNNVmpUTFNrZVF8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=60"
								alt=""
							/>
						</div>
						<div className="albums__controls">
							<Link className="albums__link" to="/album/1">
								Name
							</Link>
							<button className="albums__setting" type="button" aria-label="Photo settings" title="Photo settings">
								<svg
									focusable="false"
									aria-hidden="true"
									fill="none"
									width="16"
									height="16"
									stroke="#000000"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<use xlinkHref="#settings" />
								</svg>
							</button>
						</div>
						<p className="albums__location">Locaton</p>
					</article>
					<article className="albums__article">
						<div className="albums__wrapper">
							<img
								className="albums__img"
								src="https://images.unsplash.com/photo-1659439927054-665e92d46745?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDh8NnNNVmpUTFNrZVF8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=60"
								alt=""
							/>
						</div>
						<div className="albums__controls">
							<Link className="albums__link" to="/album/1">
								Name
							</Link>
							<button className="albums__setting" type="button" aria-label="Photo settings" title="Photo settings">
								<svg
									focusable="false"
									aria-hidden="true"
									fill="none"
									width="16"
									height="16"
									stroke="#000000"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<use xlinkHref="#settings" />
								</svg>
							</button>
						</div>
						<p className="albums__location">Locaton</p>
					</article>
					<article className="albums__article">
						<div className="albums__wrapper">
							<img
								className="albums__img"
								src="https://images.unsplash.com/photo-1659506888003-e494898cffd0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDV8NnNNVmpUTFNrZVF8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=60"
								alt=""
							/>
						</div>
						<div className="albums__controls">
							<Link className="albums__link" to="/album/1">
								Name
							</Link>
							<button className="albums__setting" type="button" aria-label="Photo settings" title="Photo settings">
								<svg
									focusable="false"
									aria-hidden="true"
									fill="none"
									width="16"
									height="16"
									stroke="#000000"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<use xlinkHref="#settings" />
								</svg>
							</button>
						</div>
						<p className="albums__location">Locaton</p>
					</article>
					<article className="albums__article">
						<div className="albums__wrapper">
							<img
								className="albums__img"
								src="https://images.unsplash.com/photo-1656800774791-2bd8cee4fdfd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDEyfDZzTVZqVExTa2VRfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=600&q=60"
								alt=""
							/>
						</div>
						<div className="albums__controls">
							<Link className="albums__link" to="/album/1">
								Name
							</Link>
							<button className="albums__setting" type="button" aria-label="Photo settings" title="Photo settings">
								<svg
									focusable="false"
									aria-hidden="true"
									fill="none"
									width="16"
									height="16"
									stroke="#000000"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<use xlinkHref="#settings" />
								</svg>
							</button>
						</div>
						<p className="albums__location">Locaton</p>
					</article>
					<article className="albums__article">
						<div className="albums__wrapper">
							<img
								className="albums__img"
								src="https://images.unsplash.com/photo-1659636688047-65f34ef54da7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDE0fDZzTVZqVExTa2VRfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=600&q=60"
								alt=""
							/>
						</div>
						<div className="albums__controls">
							<Link className="albums__link" to="/album/1">
								Name
							</Link>
							<button className="albums__setting" type="button" aria-label="Photo settings" title="Photo settings">
								<svg
									focusable="false"
									aria-hidden="true"
									fill="none"
									width="16"
									height="16"
									stroke="#000000"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<use xlinkHref="#settings" />
								</svg>
							</button>
						</div>
						<p className="albums__location">Locaton</p>
					</article>
					<article className="albums__article">
						<div className="albums__wrapper">
							<img
								className="albums__img"
								src="https://images.unsplash.com/photo-1659456950148-d1754f4cc94c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDE4fDZzTVZqVExTa2VRfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=600&q=60"
								alt=""
							/>
						</div>
						<div className="albums__controls">
							<Link className="albums__link" to="/album/1">
								Name
							</Link>
							<button className="albums__setting" type="button" aria-label="Photo settings" title="Photo settings">
								<svg
									focusable="false"
									aria-hidden="true"
									fill="none"
									width="16"
									height="16"
									stroke="#000000"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<use xlinkHref="#settings" />
								</svg>
							</button>
						</div>
						<p className="albums__location">Locaton</p>
					</article>
					<article className="albums__article">
						<div className="albums__wrapper">
							<img
								className="albums__img"
								src="https://images.unsplash.com/photo-1659464113425-715dcce997d3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDE5fDZzTVZqVExTa2VRfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=600&q=60"
								alt=""
							/>
						</div>
						<div className="albums__controls">
							<Link className="albums__link" to="/album/1">
								Name
							</Link>
							<button className="albums__setting" type="button" aria-label="Photo settings" title="Photo settings">
								<svg
									focusable="false"
									aria-hidden="true"
									fill="none"
									width="16"
									height="16"
									stroke="#000000"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<use xlinkHref="#settings" />
								</svg>
							</button>
						</div>
						<p className="albums__location">Locaton</p>
					</article>
					<article className="albums__article">
						<div className="albums__wrapper">
							<img
								className="albums__img"
								src="https://images.unsplash.com/photo-1659342405102-c2343c09c4fa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDI0fDZzTVZqVExTa2VRfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=600&q=60"
								alt=""
							/>
						</div>
						<div className="albums__controls">
							<Link className="albums__link" to="/album/1">
								Name
							</Link>
							<button className="albums__setting" type="button" aria-label="Photo settings" title="Photo settings">
								<svg
									focusable="false"
									aria-hidden="true"
									fill="none"
									width="16"
									height="16"
									stroke="#000000"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<use xlinkHref="#settings" />
								</svg>
							</button>
						</div>
						<p className="albums__location">Locaton</p>
					</article>
					<article className="albums__article">
						<div className="albums__wrapper">
							<img
								className="albums__img"
								src="https://images.unsplash.com/photo-1657401587002-b1b97c2ec2ad?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDIxfDZzTVZqVExTa2VRfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=600&q=60"
								alt=""
							/>
						</div>
						<div className="albums__controls">
							<Link className="albums__link" to="/album/1">
								Name
							</Link>
							<button className="albums__setting" type="button" aria-label="Photo settings" title="Photo settings">
								<svg
									focusable="false"
									aria-hidden="true"
									fill="none"
									width="16"
									height="16"
									stroke="#000000"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<use xlinkHref="#settings" />
								</svg>
							</button>
						</div>
						<p className="albums__location">Locaton</p>
					</article>
					<article className="albums__article">
						<div className="albums__wrapper">
							<img
								className="albums__img"
								src="https://images.unsplash.com/photo-1659183572769-a22124c4c97e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDI3fDZzTVZqVExTa2VRfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=600&q=60"
								alt=""
							/>
						</div>
						<div className="albums__controls">
							<Link className="albums__link" to="/album/1">
								Name
							</Link>
							<button className="albums__setting" type="button" aria-label="Photo settings" title="Photo settings">
								<svg
									focusable="false"
									aria-hidden="true"
									fill="none"
									width="16"
									height="16"
									stroke="#000000"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<use xlinkHref="#settings" />
								</svg>
							</button>
						</div>
						<p className="albums__location">Locaton</p>
					</article>
					<article className="albums__article">
						<div className="albums__wrapper">
							<img
								className="albums__img"
								src="https://images.unsplash.com/photo-1659347257477-c965ea8aff9d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDI1fDZzTVZqVExTa2VRfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=600&q=60"
								alt=""
							/>
						</div>
						<div className="albums__controls">
							<Link className="albums__link" to="/album/1">
								Name
							</Link>
							<button className="albums__setting" type="button" aria-label="Photo settings" title="Photo settings">
								<svg
									focusable="false"
									aria-hidden="true"
									fill="none"
									width="16"
									height="16"
									stroke="#000000"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<use xlinkHref="#settings" />
								</svg>
							</button>
						</div>
						<p className="albums__location">Locaton</p>
					</article>
					<article className="albums__article">
						<div className="albums__wrapper">
							<img
								className="albums__img"
								src="https://images.unsplash.com/photo-1659205079474-4b5904ee53ef?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDI2fDZzTVZqVExTa2VRfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=600&q=60"
								alt=""
							/>
						</div>
						<div className="albums__controls">
							<Link className="albums__link" to="/album/1">
								Name
							</Link>
							<button className="albums__setting" type="button" aria-label="Photo settings" title="Photo settings">
								<svg
									focusable="false"
									aria-hidden="true"
									fill="none"
									width="16"
									height="16"
									stroke="#000000"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<use xlinkHref="#settings" />
								</svg>
							</button>
						</div>
						<p className="albums__location">Locaton</p>
					</article>
					<article className="albums__article">
						<div className="albums__wrapper">
							<img
								className="albums__img"
								src="https://images.unsplash.com/photo-1658847412035-2ae0d3d5c364?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDYwfDZzTVZqVExTa2VRfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=600&q=60"
								alt=""
							/>
						</div>
						<div className="albums__controls">
							<Link className="albums__link" to="/album/1">
								Name
							</Link>
							<button className="albums__setting" type="button" aria-label="Photo settings" title="Photo settings">
								<svg
									focusable="false"
									aria-hidden="true"
									fill="none"
									width="16"
									height="16"
									stroke="#000000"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<use xlinkHref="#settings" />
								</svg>
							</button>
						</div>
						<p className="albums__location">Locaton</p>
					</article>
				</div>
			</section>
		</>
	);
};

export default Albums;
