import useAuth, { ProtectRoute } from '@/contexts/auth';
const { withTranslation, i18n } = require('@/utils/i18n');
import Layout from '@/components/Layout';
import {
  Avatar,
  Button,
  CircularProgress,
  makeStyles,
  Paper,
  TextField,
  Theme,
  Typography
} from '@material-ui/core';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import { ChangeEvent, useEffect, useState } from 'react';
import MyModal from '@/components/CustomModal';
import { CreatePostReq } from '../typings';
import axiosClient from '@/api/axiosClient';
import postApi from '@/api/postApi';
import Post from '@/components/Post';
import {
  RootStateOrAny,
  useDispatch,
  useSelector
} from 'react-redux';
import {
  addComment,
  addPost,
  deletePost,
  fetchListPost,
  likePost
} from '@/redux/actions/postActions';
import { PostI } from '@/redux/types';
import MyAvatar from '@/components/Avatar';
import InfiniteScroll from 'react-infinite-scroll-component';

interface IHomeProps {
  t: any;
}

function Home({ t }: IHomeProps) {
  const classes = useStyles();
  const { user, logout } = useAuth();
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();
  const {
    listPost,
    loading,
    pageCurrent,
    totalPage,
    loadingNewComent
  } = useSelector((state: RootStateOrAny) => state.post);
  useEffect(() => {
    dispatch(fetchListPost());
  }, []);

  const handleClickOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleAddPost = async ({
    text,
    file
  }: CreatePostReq): Promise<any> => {
    const formData: any = new FormData();
    if (file) formData.append('file', file, file.name);
    formData.append('text', text);
    dispatch(addPost(formData));
  };

  const handleLoadMore = () => {
    dispatch(fetchListPost());
  };

  const handleLikePost = (id: string): void => {
    dispatch(likePost(id));
  };

  const handleAddComment = (data: {
    post_id: string;
    text: string;
  }) => {
    dispatch(addComment(data));
  };

  const handleDelPost = (postId: string) => {
    dispatch(deletePost(postId));
  };
  return (
    <Layout>
      <Button className={classes.addPost} onClick={handleClickOpen}>
        <Paper
          elevation={3}
          variant="outlined"
          className={classes.paperBtn}>
          <MyAvatar name={user?.name} avatar={user?.avatar} />
          <Typography color="secondary">
            What's new with you?
          </Typography>
          <CameraAltIcon />
        </Paper>
      </Button>
      <MyModal
        open={openModal}
        handleClose={handleClose}
        user={user}
        handleAddPost={handleAddPost}
      />
      {loading && <CircularProgress size={23} />}
      <InfiniteScroll
        dataLength={listPost.length}
        next={handleLoadMore}
        hasMore={pageCurrent < totalPage}
        loader={<CircularProgress size={23} />}>
        {listPost.length > 0 &&
          listPost.map((post: PostI) => {
            let liked = false;

            if (post.likes.some((like: any) => like === user?._id)) {
              liked = true;
            }
            return (
              <Post
                key={post._id}
                idPost={post._id}
                text={post.text}
                photo={post.photo}
                user={user}
                postedBy={post.postedBy}
                liked={liked}
                likes={post.likes?.length}
                comments={post.comments}
                createdAt={post.createdAt}
                handleLikePost={handleLikePost}
                handleAddComment={handleAddComment}
                loadingNewComent={loadingNewComent}
                handleDelPost={handleDelPost}
              />
            );
          })}
      </InfiniteScroll>
    </Layout>
  );
}

Home.getInitialProps = async () => {
  return {
    namespacesRequired: ['common']
  };
};

export default ProtectRoute(withTranslation('common')(Home));
// export default withTranslation('common')(Home);

{
  /* <FacebookLogin
        appId="1535854273277522"
        autoLoad={false}
        fields="name,email,picture"
        onClick={componentClicked}
        callback={responseFacebook}
      /> */
}

{
  /* <h1>{t('h1')}</h1>
      <button type="button" onClick={() => i18n.changeLanguage('en')}>
        ENGLISH
      </button>
      <button type="button" onClick={() => i18n.changeLanguage('vi')}>
        VIET NAM
      </button> */
}
{
  /* <div className={classes.root}> */
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    width: '100%',
    height: '100%',
    zIndex: 1,
    overflow: 'hidden'
  },
  addPost: {
    display: 'flex',
    width: '100%',
    // maxWidth: '530px',
    // minWidth: '280px',
    // background: 'red',
    padding: '6px 0',
    margin: '16px auto'
  },
  paperBtn: {
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing(2)
  }
}));
